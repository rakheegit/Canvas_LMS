console.log("in removestudent service")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:" + " " + msg.course_id + " " + msg.user_email);
    var res = {};

  //  var user_course = {course_id: msg.course_id, course_name:msg.course_name}
    User.findOneAndUpdate({user_email: msg.user_email},
        {$pull:{user_courses:{course_id:msg.course_id} } }
    
   )
         .then(messages => {
            if (messages) {
                console.log("message created" + JSON.stringify(messages));
             res=({user: messages, status: "true", code: "200"});
         //       res=messages
                 callback(null, res);
                 //res.status(200).json(user)
             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);
               // res.status(500).json({ error: err })
            })
}

exports.handle_request = handle_request;
