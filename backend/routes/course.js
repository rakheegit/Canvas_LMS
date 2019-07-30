const express = require('express');
const app = express.Router()
var Course = require("../model/course");
var User = require("../model/user");
var Announce = require("../model/course_announce");
var Assigns = require("../model/course_assignment");
var Quiz = require("../model/course_quiz");
var Grade = require("../model/course_grades");
const passport = require('passport');
var kafka = require('./../kafka/client');

app.post('/coursecreate', function(req, res) {
    
    console.log("in course create (reqbody stringify): " + JSON.stringify(req.body));
    Course.findOne({ 
        $and:[ { course_dep: req.body.course_dep}, {
         $and:[ {course_id: req.body.course_id}, {course_term:req.body.course_term}] 
        }]
         }).then(course => {
        if (course) {
            console.log("course1 "+course)
            console.log("course2 "+JSON.stringify(course))
            console.log("Course already exists for this term");
            res.status(202).json({ Error: "Course already exists for this term"});
        }
        else {
    const courseFields = new Course({
        course_id: req.body.course_id,
        course_name: req.body.course_name,
        course_dep: req.body.course_dep,
        course_desc: req.body.course_desc,
        course_room: req.body.course_room,
        course_cap: req.body.course_cap,
        course_wl_cap: req.body.course_wl_cap,
        course_term: req.body.course_term,
        course_creator: req.session.user
    })
    courseFields
.save()
.then(result => {
    console.log("Course Created");
    res.status(201).json(result);

}) 
.catch(err =>  {
console.log(err)
res.status(500).json({error: "problem in creating course"});
})
        }
    })
})


app.get('/courseget',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("Inside Course Get before kafka" + user.user_email + " " + user.user_type);

    kafka.make_request('coursedetails',{course_id :req.query.course_id}, function(err,results){
   
        console.log("Inside Course Get for enroll");
        console.log("Req query : ",req.query);
	console.log("record found" + req.query.course_id);

    if (err)
    console.log(err);
    
        if(info!=undefined)
        {
            console.log(info.message);
        }
else
{
    if(results){
        console.log("results" + JSON.stringify(results));
        console.log("Get Course Successful");
        res.status(200).send(results);
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

// Enrollemnt
app.post('/courseenrollment',function(req,res){
    course_enrollment_common_new(req,res);
 });


function course_enrollment_common_new(req, res) {

    // res.redirect('/course');
    var record_found = 0;
     console.log("Inside course enrollment");
     console.log("Req Body : ",JSON.stringify(req.body));
     console.log("Req Body : ",req.body.courseDetails);
     
var mycourse_id = req.body.courseDetails[0].course_id;
console.log("mycourse_id : ",mycourse_id);

    Course.findOne({
         
            course_id: mycourse_id
    })   .exec() 
        .then(user => {
            console.log("before if" + user.course_id);
            if (user) {
                console.log("record found" + user.course_id);
                console.log("record found 2:" +  user.course_name); 
         
                record_found = 1; 
                //res.send(JSON.stringify(retFields));
                //res.send("Record found..");
                 var count = parseInt(user.course_enrollment_count, 10);
                 var wlcount = parseInt(user.course_wl_count, 10);
           
                console.log("count: " + count); 
                console.log("wlcount :" + wlcount); 
                ///////////
                count++;
                console.log("count++: " + count); 
            //    if(8<30){ console.log("inside if test")}
              console.log("req.body.courseDetails[0].course_enrollment_count: " + req.body.courseDetails[0].course_enrollment_count)
              console.log("req.body.courseDetails[0].course_cap: " + req.body.courseDetails[0].course_cap)
                if (user.course_cap > user.course_enrollment_count) {
                    console.log("!!! inside first if"+ JSON.stringify(user));
               
                    Course.findOneAndUpdate(
                        {course_id: mycourse_id}, 
                       {course_enrollment_count: count}
                     )
                     .exec()
                     .then(function(rowsUpdated) {
                        console.log("update case.."); 
                        //res.send("update done");
                        res.status(200).send("Student successfully enrolled");
                     })
                     .catch(err => {
                       console.log("inside error case22222" + err);
                        //res.status(400).json({ error: err })
                    })
                    
                    //sleep(1);
                  //  update_user_enrollemnt_record(mycourse_id, req.session.user, res);
                   
                   }
                   else {
                    console.log("printing response 204")
                    wlcount++;
                    console.log("wlcount in else " + wlcount)
                    if (user.course_wl_count < user.course_wl_cap) 
                    {
                    Course.findOneAndUpdate(
                        {course_id: req.body.courseDetails[0].course_id}, 
                        {course_wl_count: wlcount}
                      )
                      .exec()
                      .then(function(rowsUpdated) {
                         console.log("wl update case.."); 
                         res.status(203).json({ error: "Added to Waitlist!"});
                         //res.send("update done");
                      })
                      .catch(err => {
                          if(err) throw err
                        console.log("wl inside error case77777" + err);
                         //res.status(400).json({ error: err })
                     })
                    }
                    else{
                        res.status(202).json({ error: "Waiting list full. Cannot enroll."});
                    }
                    }
                }
            else {
                
                res.status(204).json({ error: "Course Capacity reached, You are in Waiting list"});
            }
            console.log("printing response 200")
            //res.status(200).json({ Success: "record found"});
        })
        .catch(err => {
            if(err) throw err
            console.log("Error case...." + err);
            res.status(400).json({ error: err })
        })
        console.log("record found 6:"); 
}

//Route to handle Post Request Call
app.get('/coursesearchbyterm',function(req,res) {

     console.log("Inside search by term");
     console.log("Req Body : ",req.query);


    Course.find(
       {
        $and:[ { course_dep: req.query.course_dep}, {
        $and:[ {course_term: req.query.course_term}, {course_id:{ $gt:req.query.course_filter}}] 
          }]
       // $and:[ {course_term: req.query.course_term}, "this.course_id > req.query.course_filter"]
         //   course_term: req.query.course_term,
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
 });



//Route to handle Post Request Call
app.get('/coursesearchbyname',function(req,res){
    // res.redirect('/course');
     console.log("Inside search by name: ");
     console.log("Req Query : ",JSON.stringify(req.query) + req.query.course_name);
 
    Course.find({
            course_name: req.query.course_name,
        })
        .then(user => {
            if (user) {
                console.log("see inside user: " + JSON.stringify(user))
                if (!user) {
                    res.status(404).json({ error: "No matching record..."});
                    return;
                }
                console.log("record found...");
  
                res.send(JSON.stringify(user));
            } else {
                res.status(404).json({ error: "record not found"});
            }
        })
        .catch(err => {
            console.log("Error case...");
            res.status(400).json({ error: err })
        })
 });


//Route to handle Post Request Call
app.get('/coursesearchbyid',function(req,res){
    // res.redirect('/course');
     console.log("Inside Course search by ID");
     console.log("Req Query : " + JSON.stringify(req.query));
     console.log("Req Body : ",req.body.course_id);
     
    Course.find({
            course_id: req.query.course_id,
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
        console.log("record found 4");  
 });



 function populate_per_course_data(retFields, course_id) {

	course_list.findOne({
        where: {
            course_id: course_id
        },
        limit: 10
    })
        .then(user => {
            if (user) {
				console.log("record found...", user.course_name);
				console.log("record found...", user.course_dep);
				console.log("record found...", user.course_term);

				retFields.push({"course_name": user.course_name});
				retFields.push({"course_dep": user.course_dep});
				retFields.push({"course_term": user.course_term});
			}
		})
        .catch(err => {
            console.log("Error case...");
            //res.status(400).json({ error: err })
        })
 }

 app.post('/announcement',function(req, res) { 
    console.log("in post annoucement backend");
    var thisday = new Date().toLocaleDateString()
    var varObj = { course_id: req.body.course_id,
        title: req.body.title,
        posted_on: thisday,
        content: req.body.content}
    
        kafka.make_request('announcement',varObj, function(err,results){
    if (err)
    console.log(err);

    else{
        if(results.code == 200){
           
            console.log("Announcement Created");

            res.status(200).json(results.anc);
        }
        else {
            if(results.code == 500){
        
                console.log("inside error" + err);
                res.status(500).json({ error: err })
            }
        }
    }
})  
})

app.post('/assignment',function(req, res) { 
    console.log("in post assignment backend");
    var thisday = new Date().toLocaleDateString()
    var varObj = { course_id: req.body.course_id,
        title: req.body.title,
        due_date: req.body.due_date,
        posted_on: thisday,
        content: req.body.content,
    total_points:req.body.total_points}
    
        kafka.make_request('assignment',varObj, function(err,results){
    if (err)
    console.log(err);

    else{
        if(results.code == 201){
           
            console.log("Assignment Created");

            res.status(201).json(results.asn);
        }
        else {
            if(results.code == 500){
        
                console.log("inside error" + err);
                res.status(500).json({ error: err })
            }
        }
    }
})  
})

app.get('/assignments',function(req, res) { 
    console.log("in get all course assignments")
    console.log("course_id: " + req.query.course_id)
    kafka.make_request('getAssignments',{course_id :req.query.course_id}, function(err,results){
       
        if(err){
            done(err,{});
        }
else
{
    if(results.code == 200){
        console.log("Get Assignments Successful");
       res.status(200).send(results.user);
    } 
    else if(results.code == 204){
        console.log("Assignments not found");
        res.status(204).send({"message":"Assignments not found"});
    }
    else {
        console.log("Failed!");
        res.status(500).send({"message":"Problem in getting assignments"});
      
    }
}
 
});

}
)

app.get('/lectures',function(req, res) { 
    console.log("in get all course LECTURES")
    console.log("course_id: " + req.query.course_id)
    kafka.make_request('getLectures',{course_id :req.query.course_id}, function(err,results){
       
        if(err){
            done(err,{});
        }
else
{
    if(results.code == 200){
        console.log("Get Lectures Successful");
       res.status(200).send(results.user);
    } 
    else if(results.code == 204){
        console.log("Lectures not found");
        res.status(204).send({"message":"Lectures not found"});
    }
    else {
        console.log("Failed!");
        res.status(500).send({"message":"Problem in getting Lectures"});
      
    }
}
 
});

}
)

app.get('/subassigns',function(req, res) { 
    console.log("in get all course assignments")
    console.log("course_id: " + req.query.course_id)
    kafka.make_request('subassigns',{course_id :req.query.course_id}, function(err,results){
       
        if(err){
            done(err,{});
        }
else
{
    if(results.code==200){
        console.log("Get Assignments Successful");
       res.status(200).send(results.user);
    } 
    else if(results.code == 204){
        console.log("Assignments(s) not found");
        res.status(204).send({"message":"Assignments(s) not found"});
    }
    else {
        console.log("Failed!");
        res.status(500).send({"message":"Problem in getting assignments"});
      
    }
}
 
});

}
)

    /*
    assigns_list.findAndCountAll({
        include: [{
          model: course_list,
          where: {course_id: req.query.course_id},
          required: true
         }]
      })    
    .then(user => {
        if (user) {
            console.log("user :" + JSON.stringify(user))
        //    console.log("record found" + user.rows[0].course_id);
         //   console.log("record found 1" + user.rows[0].content);  
console.log("user count : " + user.count)
            var retFields = [];
                for (var i = 0; i < user.count; i++) {
                    retFields.push({"course_id": user.rows[i].course_id,
                                    "title": user.rows[i].title,
                                    "posted_on": user.rows[i].posted_on,
                                    "posted_by": user.rows[i].posted_by,
                                    "due_date": user.rows[i].due_date,
                                    "content": user.rows[i].content
                                });    
                                console.log("record found....." + user.rows[0].course_id);
                }
                console.log("record found 3");  

            res.send(JSON.stringify(retFields));
        } else {
            res.status(404).json({ error: "record not found"});
        }
    })
    .catch(err => {
        if (err) throw err
		console.log("inside error case22222");
		res.status(400).json({ error: err })
	}

    )
	
});
*/

app.get('/announcements',function(req, res) { 
    console.log("in get all course announcements")
    console.log("course_id: " + req.query.course_id)
    kafka.make_request('getAnnouncements',{course_id :req.query.course_id}, function(err,results){
       
        if(err){
            done(err,{});
        }
else
{
    if(results.code == 200){
        console.log("Get Annoucements Successful");
       res.status(200).send(results.user);
    } 
    else if(results.code == 204){
        console.log("Annoucements(s) not found");
        res.status(204).send({"message":"Announcements(s) not found"});
    }
    else {
        console.log("Failed!");
        res.status(500).send({"message":"Problem in getting annoucements"});
      
    }
}
 
});

}
)


app.get('/grades',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in get grades")
	console.log("record found" + req.query.course_id);

    if (err)
    console.log(err);
    
        if(info!=undefined)
        {
            console.log(info.message);
        }
        else{

    Grade.find({
        course_id: req.query.course_id,
        user_email: user.user_email
    })   
    .then(grades => {
        if (grades) {
            console.log("grade record :" + JSON.stringify(grades))
            res.send(JSON.stringify(grades));
        } else {
            res.status(404).json({ error: "record not found"});
        }
    })
    .catch(err => {
        if (err) throw err
		console.log("inside error case22222");
		res.status(500).json({ error: err })
	}
    )
}
}
)(req,res,next)
)

app.get('/gradesum',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
    console.log("in get sum grades")
	console.log("record found" + req.query.course_id);

    if (err)
    console.log(err);
    
        if(info!=undefined)
        {
            console.log(info.message);
        }
        else{

    Grade.aggregate([{
        $match: {user_email: user.user_email,course_id: req.query.course_id}}, { 
        $group: {
            _id: '',
            task_grade: { $sum: '$task_grade' },
            task_outof: { $sum: '$task_outof' },
        }
     }, {
        $project: {
            _id: 0,
            sum_grade: '$task_grade',
            sum_outof: '$task_outof'
        }
    }])
  
    .then(grades => {
        if (grades) {
            console.log("grade sum record :" + JSON.stringify(grades))
            res.send(JSON.stringify(grades));
        } else {
            res.status(404).json({ error: "record not found"});
        }
    })
    .catch(err => {
        if (err) throw err
		console.log("inside error case22222");
		res.status(500).json({ error: err })
	}
    )
}
}
)(req,res,next)
)



app.get('/people',function(req,res) {
    console.log("student search by course")
      console.log("Req Body : ",req.query.course_id);
   
     User.find(
         {'user_courses.course_id': req.query.course_id}
       )
       .select('user_name user_email user_type')
       .exec()
       .then(user => {
           if (user) {
               console.log("user found" + user);
                 res.status(200).json(user) 
           } 
              else {
                 res.status(404).json({ error: "record not found"});
             }
         })
         .catch(err => {
             console.log("Error case...");
             res.status(400).json({ error: err })
         })
  });
  

app.get('/quiz',function(req, res) { 
    console.log("In get course quiz")
	console.log("record found" + req.query.course_id);
	//console.log("record found" + req.body.announcement);
    Quiz.find(
        {'course_id': req.query.course_id}
      )
      .select('title posted_on due_date')
      .exec()  
    .then(quiz => {
        if (quiz) {
            console.log("user found" + quiz);
            res.status(200).json(quiz) 
      } 
         else {
            res.status(404).json({ error: "record not found"});
        }
    })
    .catch(err => {
        console.log("Error case...");
        res.status(400).json({ error: err })
    })
});

//Route to handle Post Request Call
app.post('/coursedrop',function(req,res){
    // res.redirect('/course');
    var record_found = 0;
     console.log("Inside course drop");
     console.log("Req Body : ",JSON.stringify(req.body));
     console.log("Req Body : ",req.body.courseDetails);
     
var mycourse_id = req.body.courseDetails[0].course_id;
console.log("mycourse_id : ",mycourse_id);

    Course.findOne({
         
            course_id: mycourse_id
    })   .exec() 
        .then(course => {
            if (course) {
                console.log("record found" + course.course_id);
                console.log("record found 2:" +  course.course_name); 
   
                console.log("req.body.courseDetails[0].course_enrollment_count: " + req.body.courseDetails[0].course_enrollment_count)
                  if (course.course_enrollment_count > 0) {
                
                    //console.log("!!! inside first if"+ JSON.stringify(user));
               
                    Course.findOneAndUpdate(
                        {course_id: course.course_id},
                        { $inc: { course_enrollment_count : -1 } }
                     )
                     .then(function(rowsUpdated) {
                        console.log("update case.."); 
                    //**    course_deenrollment_common(req.body.course_id,req.session.user,res)
                        //res.send("update done");
                        res.status(200).send("Student dropped!");
                     })
                     .catch(err => {
                       console.log("inside error case22222");
                        //res.status(400).json({ error: err })
                    })
                     
                   }
                   else{
                    console.log("Nothing to drop. Enrollment count is zero"); 
                   }
 
            } else {
                res.status(404).json({ error: "Invalid Course! Course not found"});
            }
            //res.status(200).json({ Success: "record  found"});
        })
        .catch(err => {
            console.log("Error case.." + err);
            res.status(500).json({ error: err })
        })
        console.log("record found 6:"); 
 
 });

 app.get('/quiz/:quiz_id?', function(req, res) {

  
    kafka.make_request('getQuizById',{quiz_id:req.params.quiz_id}, function(err,results){
      if (err)
      console.log(err);
  
      else{
          if(results){
             
              console.log("Quiz retrieved");
  
              res.status(200).json(results);
          }
          else if(results.code == 404){
          
                  console.log("not found");
                  res.status(404).json({ error: "Quiz not found" })
              }
              else {
             
                  console.log("Quiz retrieval failed");
                  res.status(500).json({ error: err })
              }
          
      }
  })  
  })

  app.get('/assn/:assn_id?', function(req, res) {

      console.log("### in get assignment by id:"+req.params.assn_id);
      kafka.make_request('getAssignmentById',{assn_id:req.params.assn_id}, function(err,results){
        if (err)
        console.log(err);
    
        else{
            if(results){
               
                console.log("Assignment retrieved");
    
                res.status(200).json(results);
            }
            else if(results.code == 404){
            
                    console.log("not found");
                    res.status(404).json({ error: "assignment not found" })
                }
                else {
               
                    console.log("Assignment retrieval failed");
                    res.status(500).json({ error: err })
                }
            
        }
    })  
    })
     


 app.post('/quiz',function(req, res) { 
    console.log("In create quiz" + req.body.course_id);
    console.log("record found" + req.body.title);
  //  console.log("record found" + req.body.question);
   // req.body.posted_on = "9-Mar-2019";

    var thisday = new Date().toLocaleDateString()
console.log("thisday: " + thisday)

const quizFields = new Quiz({
    course_id: req.body.course_id,
    title: req.body.title,
    posted_on: thisday,
    due_date: req.body.due_date,
/*    quiz_items: [{
                question: req.body.question,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                answer: req.body.answer
                }]
     */           
})
quizFields.save()
.then(result => {
console.log("Quiz Created" + result);
res.status(201).json(result);
}) 
.catch(err =>  {
console.log(err)
res.status(500).json({error: "problem in creating quiz"});
})
});

app.post('/addquestion',function(req, res) { 
    console.log("Add question to Quiz" + req.body._id);
    console.log("record found" + JSON.stringify(req.body));
    console.log("record found" + req.body.question);
   // req.body.posted_on = "9-Mar-2019";

    var thisday = new Date().toLocaleDateString()
console.log("thisday: " + thisday)

/*
var quiz_q = 
    {question: req.body.question,
            answers:[{values: "hello",is_correct: true},
                {values: "bye",is_correct: false}
            ]
    }
    */

var quiz_q = 
    {question: req.body.question,
            answers:[{is_correct: req.body.optionAval,value: req.body.optionA},
                {is_correct: req.body.optionBval,value: req.body.optionB},
                {is_correct: req.body.optionCval,value: req.body.optionC},
                {is_correct: req.body.optionDval,value: req.body.optionD}
            ]
    }
    
console.log("quiz_q :" + quiz_q)
Quiz.findOneAndUpdate({_id: req.body._id},
    //User.findOneAndUpdate({user_email: req.body.user_email},
         {$push:{questions:quiz_q} } 
     
    )
     .exec()
      .then( result => {
          console.log("updated quiz is: " + result)
        res.status(200).send("Quiz successfully updated");
      })
      .catch(err => {
         if (err) {
             // An unknown error occurred when uploading.
             console.log("an error" + err)
         }
        console.log("inside error" + err);
        res.status(500).json({ error: err })
     })
    });

    app.post('/quizgrade',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
 
        console.log("in Quiz grade" + req.body.course_id);
        console.log("record found" + req.body.task_id);
        console.log("record found" + req.body.task_grade);
        console.log("record found" + req.body.task_outof);
        console.log("record found" + req.body.task_title);
        console.log("req.body" + JSON.stringify(req.body));

        if (err)
        console.log(err);
        
            if(info!=undefined)
            {
                console.log(info.message);
            }
            else{
        
        const gradeFields = new Grade({
            course_id: req.body.course_id,
            task_id: req.body.task_id,
            task_title:req.body.task_title,
            task_type: "Quiz",
            task_grade:req.body.task_grade,
            task_outof:req.body.task_outof,
            user_email: user.user_email
        })
        gradeFields
    .save()
    .then(result => {
        console.log("Grade Entry Created");
        res.status(201).json(result);
    
    }) 
    .catch(err =>  {
    console.log(err)
    res.status(500).json({error: "problem in creating grade entry"});
    })
}
}
)(req,res,next)
)

    
    app.post('/assngrade',(req,res,next) =>passport.authenticate('jwt', { session: false },(err,user,info) =>{
        console.log("in Assin grade" + req.body.course_id);
        console.log("record found" + req.body.task_id);
        console.log("record found" + req.body.task_grade);
        console.log("record found" + req.body.task_outof);
        console.log("record found" + req.body.task_title);

        if (err)
        console.log(err);
        
            if(info!=undefined)
            {
                console.log(info.message);
            }
            else{
    
        console.log("req.body" + JSON.stringify(req.query));

        var thisday = new Date().toLocaleDateString()
    console.log("thisday: " + thisday)
        
    const gradeFields = new Grade({
        course_id: req.body.course_id,
        task_id:req.body.task_id,task_title: req.body.task_title,
            task_grade: req.body.task_grade,
        task_type: "Assignment",
        task_outof:req.body.task_outof,
        user_email: req.body.user_email
    })
    gradeFields
.save()
    .then(result => {
        console.log("result")
        console.log("Grade Entry Created");
        res.status(201).json(result);
    
    }) 
    .catch(err =>  {
    console.log(err)
    res.status(500).json({error: "problem in creating grade entry"});
    })
 }
}
)(req,res,next)
)


   
module.exports = app
