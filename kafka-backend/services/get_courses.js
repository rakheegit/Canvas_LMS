console.log("in get dashboard courses")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.user_email)
    var res = {};

    User.findOne({
        user_email: msg.user_email
     })  .select('user_courses user_type')
//})  .select('user_courses')
         .exec()
         .then(user => {
             if (user) {
               console.log("record found 1 " + user.user_courses);
                 console.log("record found" + user.course_id);
                 console.log("user found" + user);
                // res.status(200).json({user_photo: user.user_photo, user_name: user.user_name, user_email: user.user_email})
               // res.send(JSON.stringify(user.user_courses)); 
               res=({user: JSON.stringify(user), code: "200"});
             //  res=({user: JSON.stringify(user.user_courses), code: "200"});
               callback(null, res);
               // res.status(200).json(user)
             }else {
                res=({code: "404"});
                callback(null, res);
            }
            })
            .catch(err => {
                console.log("Error case.." + err);
                res=({code: "500"});
                callback(null, res);
            })

}

exports.handle_request = handle_request;


