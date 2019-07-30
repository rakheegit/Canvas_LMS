console.log("in get dashboard courses")

var Announce = require("../model/course_announce");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.course_id)
    var res = {};

    Announce.find({
        course_id: msg.course_id,
    })   
    .then(announcements => {
        if (announcements) {
            console.log("user :" + JSON.stringify(announcements))
             
               res=({user: JSON.stringify(announcements), code: "200"});
               callback(null, res);
               // res.status(200).json(user)
             }else {
                res=({code: "204"});
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


