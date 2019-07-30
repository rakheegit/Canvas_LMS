console.log("in get assignmnent by Id")

var Assigns = require("../model/course_assignment");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.assn_id)
    var res = {};

    Assigns.findOne({
        _id: msg.assn_id,
    })   
    .then(assignment => {
        if (assignment) {
            console.log("user :" + JSON.stringify(assignment))
             
             //  res=(user: assignment, code: "200"});
             
               callback(null, assignment);
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


