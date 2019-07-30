//const file1  = require('./index.1')

const express = require('express');
const app = express.Router()
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const multer  = require('multer')
var fs = require('fs');
var Sequelize = require('sequelize');
var User = require("../model/user");
var UserAssign = require("../model/user_assignments");
var Lectures = require("../model/course_lectures");
var Grade = require("../model/course_grades");
var courseSchema = require("../model/course");
var Message = require("../model/message");
const passport = require('passport');
var kafka = require('./../kafka/client');
//require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

const Op = Sequelize.Op;
//use cors to allow cross origin resource sharing


const file_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("in cb file destination : ",file.originalname);
        cb(null, './profile_uploads/')
    },
    filename: function (req, file, cb) {
        console.log("in cb file Body : ",file.originalname);
      cb(null, new Date().toISOString() + file.originalname)
    }
  })

  const fileFilter = (req,file,cb) => {
      //store a file
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='application/pdf')
      cb(null,true)
else 
      //reject a file
      cb(null,false)
  }

  const upload = multer({ storage: file_storage ,fileFilter:fileFilter});
  //var upload = multer({ storage: file_storage ,fileFilter:fileFilter}).single('common_name');


  app.get('/getdoc', function (req, res) {
 
    res.download(path.join(__dirname, './profile_uploads/2019-04-11T06:43:53.075Z9DC7581161.pdf'), function (err) {
 
        console.log(err);
 
    });
 
});

  //var upload = multer()
  app.post('/fileupload', function (req, res) {
    console.log("Inside profileupdate Post Request");
    console.log("Req Body : ",JSON.stringify(req.body));
    console.log("*** Req file : ",req.files);
    console.log("email Body : ",req.body.user_email);

    upload(req, res, function (err) {
        //console.log("Inside Login Post Request:"+ req.file.filename);
        console.log("Inside Login Post Request1:", req.file.filename);
        console.log("Inside Login Post Request2:", req.body.course_id);
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
      
    })
    res.end("Error case 2");
  })


app.get('/profile',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    
    kafka.make_request('profile',{email :user.user_email}, function(err,results){
    
        console.log('in Get profile Details request: ',user.user_email + " " + user.user_type);
        console.log("results" + JSON.stringify(results));
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{

        if(results){
            console.log("Get Details Successful");
           
            return res.status(200).send(JSON.stringify(results));
        }
        else {
            res.status(404).send({"message":"User not found"});
            console.log("get profile Failed");
        }
    }

});

}
)(req,res,next)
)


app.get('/message_list',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("1 In backend message_list!!")
    kafka.make_request('messagelist',{email :user.user_email}, function(err,results){
    console.log("In backend message_list!!")

    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
            if(results){
                console.log("Get Details Successful");
                return res.status(200).send(results);
            }
            else {
                res.status(404).send({"message":"User not found"});
                console.log("get profile Failed");
            }

        }
    })
}
)(req,res,next)
)

app.get('/getbysubject',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    
    kafka.make_request('msgBySubject',{email :user.user_email,subject:req.query.subject}, function(err,results){
    
    console.log("In Get by subject!!" + req.query)
    console.log("subject" + req.query.subject);

    if (err)
    console.log(err);

    if(results){
        console.log("Get Details Successful");
        return res.status(200).send(results);
    }
    else {
        res.status(404).send({"message":"User not found"});
        console.log("get profile Failed");
    }

    })  
}
)(req,res,next)
)

  app.post('/messages',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
      console.log("11 In post messages!!")

    kafka.make_request('replytomsg',{email :user.user_email,to_email: req.body.to_email,subject:req.body.subject,message: req.body.message}, function(err,results){
        console.log("In post messages!!")
  
      if (err)
      console.log(err);
  
      if(info!=undefined)
      {
          console.log(info.message);
      }
      else{
        if(results.code == 201){
           
            console.log(results);

            return res.status(201).send({"message":"Message posted Successfully"});
        }
        else {
        
            console.log(results);
            res.status(202).send({"message":"Message failed!"});
        } 
}
})  
}
)(req,res,next)
)

  
app.post('/signup', (req, res) => {
    console.log("### in post signup_new:"+req.body.user_email);
    console.log("reqbody stringify: " + JSON.stringify(req.body));

    var varObj= {
         user_email: req.body.user_email, 
         user_password: req.body.user_password,
         user_name: req.body.user_name,
         user_type: req.body.user_type
     }
 
     kafka.make_request('signup',varObj, function(err,results){

    console.log("Req Body : ",JSON.stringify(req.body));
    console.log(results);

    if (err)
    console.log(err);
    else{
      if(results.code == 201){
        console.log("201 response " + results.user);
        res.status(201).json({ message: "creating new user",newUserCreated: results.user})
      }
      else if(results.code == 202){
         
        console.log("202 response");
        res.status(202).json({ Error: "User already registered"});
    
      }
      else {
          console.log(results);
          res.status(500).send({"message":"Problem in Signing up!"});
      } 
}
})  
})

app.post('/signin',function(req,res,next) {

    console.log("Inside Login Post Request" + req.body.user_email);

    var varObj= {
         user_email: req.body.user_email, 
         user_password: req.body.user_password
     }
 
     kafka.make_request('signin',varObj, function(err,results){

    console.log("Req Body : ",JSON.stringify(req.body));
    console.log(results);

    if (err)
    console.log(err);
    else{
      if(results.code == 200){
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        console.log("200 response " + results.user);
          res.status(200).send(results.user);
      }
      else if(results.code == 201){
         
        console.log("201 response");
        res.status(201).json({ error: 'Incorrect password!' })
    
      }
      else if(results.code == 203){
         
        console.log("203 response");
        res.status(203).json({ error: 'User is not registered' })
    
      }
      else {
      
          console.log(results);
          res.status(500).send({"message":"Operation failed!"});
      } 
}
})  
})



 //delete sample
 app.delete('/delete',function(req,res){

    console.log("Inside delete");
  
   userSchema.deleteOne({
           user_email: req.body.user_email
   })
        .then(user => {
            console.log("user" + JSON.stringify(user));
            if(user.deletedCount==0)
            {
                res.status(404).json({ error: "record not found"});
            }
            else
               res.status(200).json({ success: "record deleted"});
           
        
       })
       .catch(err => {
           console.log("Error case.." + err);
           res.status(500).json({ error: err })
       })
});


//get profile pic
app.get('/profilepic',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in profile PIC get");


    kafka.make_request('profilepic',{email :user.user_email}, function(err,results){
    
        console.log('in Get profile Details request: ',user.user_email);
        console.log("results" + JSON.stringify(results));
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{

        if(results){
            console.log("Get User Details Successful");
            res.status(200).json({user_photo: results.user_photo, user_name: results.user_name, user_type: results.user_type,user_email: results.user_email})
        }
        else if (results.code == 404){
            console.log("get profile Failed");
            res.status(404).send({"message":"User not found"});
        }
        else{
            console.log("Problem is displaying picture");
            res.status(500).send({"message":"Problem is displaying picture"});
        }
    }

});

}
)(req,res,next)
)


app.post('/profile',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in profile update: " + user.user_type + user.user_email);

   var varObj= {
    email :user.user_email,
        user_name: req.body.user_name, 
        user_phone: req.body.user_phone, user_about_me: req.body.user_about_me,
        user_city: req.body.user_city, user_country: req.body.user_country,
        user_company: req.body.user_company, user_school: req.body.user_school,
        user_hometown: req.body.user_hometown, user_language: req.body.user_language,
        user_gender: req.body.user_gender
  //      user_gender: req.body.user_gender,user_photo: req.file.path
    }

    kafka.make_request('updateprofile',varObj, function(err,results){

    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
        if(results.code == 200){
           
            console.log(results);

            res.status(200).send({"message":"Profile Updated Successfully"});
        }
        else {
        
            console.log(results);
            res.status(202).send({"message":"Update failed!"});
        } 
}
})  
}
)(req,res,next)
)


app.post('/addcourse',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in enroll student");

    var varObj = {course_id: req.body.course_id, course_name:req.body.course_name,user_email:user.user_email}
    
        kafka.make_request('addcourse',varObj, function(err,results){
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
        if(results.code == 200){
           
            console.log(results);

            res.status(200).send("User record successfully updated");
        }
        else {
            if(results.code == 500){
        
                console.log("inside error" + err);
                res.status(500).json({ error: err })
        }
    }
}
})  
}
)(req,res,next)
)

app.post('/removestudent',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in enroll student");

    var varObj = {course_id: req.body.course_id, user_email:req.body.user_email}
    
        kafka.make_request('removestudent',varObj, function(err,results){
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
        if(results.code == 200){
           
            console.log(results);

            res.status(200).send("User record successfully updated");
        }
        else {
            if(results.code == 500){
        
                console.log("inside error" + err);
                res.status(500).json({ error: err })
        }
    }
}
})  
}
)(req,res,next)
)


app.post('/checkusercourse',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in check user course");

    kafka.make_request('checkusercourse',{user_email :user.user_email,course_id: req.body.course_id}, function(err,results){
        if (err)
        console.log(err);
    
        if(info!=undefined)
        {
            console.log(info.message);
        }
        else{

            if(results.code == 200){
               
                console.log(results);
    
                res.status(200).send("Course enrolled already, can only be dropped");
            }
            else if(results.code == 204){

                    console.log("response 204");
                console.log(results);

                    res.status(204).send("course can be enrolled!!")
            }
            else{
            
                    console.log("inside error" + err);
                    res.status(500).json({ error: err })
            }
        }
        
    })  
    }
    )(req,res,next)
    )




   
app.post('/removecourse',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in drop student");
    if (err)
    console.log(err);
    
        if(info!=undefined)
        {
            console.log(info.message);
        }
        else{
           console.log("user found in db" +  req.body.course_id + req.body.course_name);
    var user_course = {course_id: req.body.course_id, course_name:req.body.course_name}
      //  User.findOneAndUpdate({user_email: user.user_email},
       //User.findOneAndUpdate({user_email: req.body.user_email},
        //    {$pull:{user_courses:user_course} } 

                User.findOneAndUpdate({user_email: user.user_email},
                       {$pull:{user_courses:user_course} } )
                       .exec()
                .then(result=>{
                 console.log("after removing course : " + result)
                 res.status(200).send("Course Dropped successfully");
                    })
                       .catch(err => {
                        if (err) 
                            // An unknown error occurred when uploading.
                            console.log("an error" + err)
                            res.status(500).json({ error: err })
                        })  
            
          // res.status(200).send("Course Dropped successfully");
           //  res.send(result)
}
}
)(req,res,next)
)


app.post('/photoupdate',upload.single('user_photo'),(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
 
    console.log("stringify req.file : " + JSON.stringify(req.file))
    console.log("req.files : " + req.files)
    console.log("Req Body : ",JSON.stringify(req.body));

    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
       console.log("user found in db");
    //   User.findOneAndUpdate({user_email: "john@gmail.com"},
       User.findOneAndUpdate({user_email: user.user_email},
        {
            user_photo: req.file.path
  //      user_gender: req.body.user_gender,user_photo: req.file.path
    })
    .exec()
     .then( result => {
         console.log("updated profile photo is: " + result)
       res.status(200).send("User Photo successfully updated");
     })
     .catch(err => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log("an error1" + err)
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("an error2" + err)
        }
       console.log("inside error" + err);
       res.status(500).json({ error: err })
    })
}
}
)(req,res,next)
)

app.post('/fileinitiate',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
   
   // console.log("stringify req.file : " + JSON.stringify(req.file.path))
  //  console.log("req.files : " + req.files)
    console.log("Req Body : ",JSON.stringify(req.body));
  //  console.log(" req.file : " + req.file.path)
    var thisday = new Date().toLocaleDateString()
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
       console.log("user found in db");

       const assignsFields = new UserAssign({
        course_id: req.body.course_id,
        title: req.body.title,
        assn_id: req.body.assn_id,
        submitted_on: thisday,
    //    user_file: req.file.path,
        user_email: user.user_email
    })
    assignsFields
.save()
     .then( result => {
         console.log("updated record is: " + result)
       res.status(201).send("File upload successful");
     })
     .catch(err => {
       if (err) {
            // An unknown error occurred when uploading.
            console.log("an error2" + err)
        }
       console.log("inside error" + err);
       res.status(500).json({ error: err })
    })
}
}
)(req,res,next)
)  

app.post('/file',upload.single('user_file'),(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
   
    console.log("stringify req.file : " + JSON.stringify(req.file.path))
    console.log("req.files : " + req.files)
    console.log("Req Body : ",JSON.stringify(req.body));
    console.log(" req.file : " + req.file.path)

    var part = ''
    part = JSON.stringify(req.file.path)
    var fullpath = ''
fullpath = 'http://localhost:3001/'+ req.file.path
console.log("fullpath: " + fullpath)
    
    var thisday = new Date().toLocaleDateString()
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
       console.log("user found in db");

       UserAssign.findOneAndUpdate({course_id: req.body.course_id,user_email: user.user_email,
        assn_id:req.body.assn_id,title: req.body.title,
        total_points: req.body.total_points},
        {
            user_file: fullpath,submitted_on: thisday
  //      user_gender: req.body.user_gender,user_photo: req.file.path
    },
    { upsert: true})
    .exec()
     .then( result => {
         console.log("updated record is: " + result)
       res.status(201).send("File upload successful");
     })
     .catch(err => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log("an error1" + err)
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("an error2" + err)
        }
       console.log("inside error" + err);
       res.status(500).json({ error: err })
    })
}
}
)(req,res,next)
)

app.get('/path',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{

    console.log("Inside search path");
    console.log("Req Body : ",req.query);
    console.log("Req Body : ",req.query.user_email);

    if(err){
        done(err,{});
    }
    if(info!=undefined)
    {
        console.log(info.message);
    }

    console.log("type" + typeof(req.query.user_email))
var email = ""
    if(typeof(req.query.user_email)==="undefined"){
    email = user.user_email
    console.log("type pass")
    }
    else
    email = req.query.user_email

   UserAssign.findOne(
      {
      //  user_email: user.user_email, assn_id: req.query.assn_id
      user_email: email, assn_id: req.query.assn_id
           //course_id:  { [Op.gt]: course_id }
       })
       .then(user => {
           if (user) {
               if (!user) {
                   res.status(404).json({ error: "No matching record..."});
                   return;
               }     
                   console.log("record found 3"); 

               res.send(JSON.stringify(user));
           } else {
               res.status(404).json({ error: "record not found"});
           }
        
       })
       .catch(err => {
           console.log("Error case...");
           res.status(400).json({ error: err })
       })

}
)(req,res,next)
) 


app.post('/lectures',upload.single('user_file'),(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
   
    console.log("stringify req.file : " + JSON.stringify(req.file.path))
    console.log("req.files : " + req.files)
    console.log("Req Body : ",JSON.stringify(req.body));
    console.log(" req.file : " + req.file.path)
    
    var thisday = new Date().toLocaleDateString()
    if (err)
    console.log(err);

    if(info!=undefined)
    {
        console.log(info.message);
    }
    else{
       console.log("user found in db");


       const assignsFields = new Lectures({
        course_id: req.body.course_id,
        user_file: req.file.path,
        posted_on: thisday
       
    })
    assignsFields
.save()
     .then( result => {
         console.log("updated record is: " + result)
       res.status(201).send("File upload successful");
     })
     .catch(err => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log("an error1" + err)
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("an error2" + err)
        }
       console.log("inside error" + err);
       res.status(500).json({ error: err })
    })
}
}
)(req,res,next)
)

app.get('/courses',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("Inside display course in dashboard" + user.user_type);
    kafka.make_request('get_courses',{user_email :user.user_email,user_type:user.user_type}, function(err,results){
    
        console.log("Inside display course in dashboard kafka");
       
        if(err){
            done(err,{});
        }
        if(info!=undefined)
        {
            console.log(info.message);
        }
else
{
    if(results.code == 200){
        console.log("Get Course Successful");
       res.status(200).send(results.user);
    } 
    else if(results.code == 404){
        console.log("Course(s) not found");
        res.status(404).send({"message":"Course(s) not found"});
    }
    else {
        console.log("Failed!");
        res.status(500).send({"message":"Problem in getting courses"});
      
    }
}
 
});

}
)(req,res,next)
) 


module.exports = app