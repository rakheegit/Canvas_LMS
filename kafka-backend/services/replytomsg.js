console.log("in replytomsg service")

var Message = require("../model/message");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg) + " " + msg.email);
    var res = {};

    var message = new Message({user_email: msg.email, to_email: msg.to_email, subject: msg.subject, message: msg.message });
    
    message.save()
         .then(messages => {
            if (messages) {
                console.log("message created" + JSON.stringify(messages));
             res=({user: messages, status: "true", code: "201"});
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
