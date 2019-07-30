console.log("in post assignment service")

var Message = require("../model/course_assignment");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};

    const assignsFields = new Assigns({
        course_id: msg.course_id,
        title: msg.title,
        due_date: msg.due_date,
        posted_on: msg.posted_on,
        content: msg.content,
        total_points: msg.total_points,
    })
    assignsFields
.save()
         .then(asn => {
            if (asn) {
                console.log("assignment created" + JSON.stringify(asn));
             res=({user: asn, code: "201"});
         //       res=messages
                 callback(null, res);
                 //res.status(200).json(user)
             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err,  code: "500"});
                callback(null, res);
               // res.status(500).json({ error: err })
            })
}

exports.handle_request = handle_request;
