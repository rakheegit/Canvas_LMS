console.log("in update profile service")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};
console.log("email:" + msg.email )
    User.findOneAndUpdate({user_email: msg.email},
        {
        user_name: msg.user_name, 
        user_phone: msg.user_phone, user_about_me: msg.user_about_me,
        user_city: msg.user_city, user_country: msg.user_country,
        user_company: msg.user_company, user_school: msg.user_school,
        user_hometown: msg.user_hometown, user_language: msg.user_language,
        user_gender: msg.user_gender
  //      user_gender: msg.user_gender,user_photo: req.file.path
    })
     .exec()
         .then(messages => {
         
                console.log("Profile updated " + JSON.stringify(messages));
             res=({user: messages, status: "true", code: "200"});
         //       res=messages
                 callback(null, res);
                 //res.status(200).json(user)
             })
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);
               // res.status(500).json({ error: err })
            })
}

exports.handle_request = handle_request;
