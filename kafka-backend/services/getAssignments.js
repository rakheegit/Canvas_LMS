console.log("in get all assignments by course Id")

var User = require("../model/course_assignment");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.course_id)
    var res = {};

    Assigns.find({
        course_id: msg.course_id,
    })   
    .then(assignments => {
        if (assignments) {
            console.log("user :" + JSON.stringify(assignments))
             
               res=({user: JSON.stringify(assignments), code: "200"});
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


