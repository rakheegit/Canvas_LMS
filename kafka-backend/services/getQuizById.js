console.log("in get quiz by Id")

var Quiz = require("../model/course_quiz");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.quiz_id)
    var res = {};

    Quiz.findOne({
        _id: msg.quiz_id,
    })   
    .then(quiz => {
        if (quiz) {
            console.log("user :" + JSON.stringify(quiz))
             
             //  res=(user: quiz, code: "200"});
             
               callback(null, quiz);
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


