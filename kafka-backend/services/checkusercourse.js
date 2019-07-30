console.log("in check and enroll courses")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.user_email)
    var res = {};

    User.find({
        user_email: msg.user_email,
    user_courses: {
        $elemMatch: {
          course_id: msg.course_id
        //  likes: ObjectId("593f8c591ba95154cfebe790")
        }
      }
    }
    )
        .exec()
         .then(user => {
                console.log("result profile is: " + user)
                if (user=='')
                {
                    console.log("result is empty")
                //    res.status(204).send("course can be enrolled!!");
                res=({user: user, code: "204"});
                callback(null, res);
                }else{
                    //res.status(200).send("Course enrolled already, can only be dropped")
                    res=({user: user, code: "200"});
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


