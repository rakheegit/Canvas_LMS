console.log("in profile service")


var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
console.log("email: " + msg.email)

    User.findOne({
        //     user_email: req.session.user
        user_email: msg.email
     })  .select('user_name user_email user_type user_photo')
         .exec()
         .then(user => {
             if (user) {
                 console.log("record found" + user.user_phone);
                 console.log("user found" + user);
               //  res=({user: user,  code: "200"});
                res=user
                 callback(null, user);
                 //res.status(200).json(user)
             }
            else{
                console.log("user not found" + user);
                res=({ code: "200"});
             //  res=user
                callback(null, res);
            }
            })
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, code: "500"});
                callback(null, res);
               // res.status(500).json({ error: err })
            })
        }

exports.handle_request = handle_request;


