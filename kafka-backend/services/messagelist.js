console.log("in messagelist service")


var Message = require("../model/message");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    var email = msg.email;
    var res = {};
    Message.aggregate([
        {
             $match: {
       //          "to_email":user.user_email,     
        $or:[ {user_email: email}, {to_email:email}]  
             }
         },
    //     {"$sort":{"subject":1}},
         {"$group":{
             "_id": "$subject",toemail: { $first: "$to_email"},fromemail:{ $first: "$user_email"},
          //  "_id": "$subject",emails: { $push: "$$ROOT" },
        //    "toemail": {"$to_email":"$$ROOT"}
             "subject": { "$last": "$subject" } 
        }}
     ])
         .exec()
         .then(messages => {
            if (messages) {
               console.log("variables" + messages.user_email ) 
                console.log("user found" + JSON.stringify(messages));
                // res=({user: user, status: "true", code: "200"});
              //  res=messages
                 callback(null, messages);
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
