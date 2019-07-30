console.log("in get all lectures by course Id")

var Lectures = require("../model/course_lectures");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.course_id)
    var res = {};

    Lectures.find({
        course_id: msg.course_id,
    })   
    .then(lecs => {
        if (lecs) {
            console.log("user :" + JSON.stringify(lecs))
             
               res=({user: JSON.stringify(lecs), code: "200"});
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


