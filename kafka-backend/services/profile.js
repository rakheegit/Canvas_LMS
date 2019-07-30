console.log("in profile service")


var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log("in get profile service")
    var email = msg.email;

    User.count({user_email:email}, function (err, count) {
        if(err)
        {
            console.log(message);
            res.code="500";
            res.data="Some Error Happened while checking user ID"
            callback(null,res);
        }
     else {
        if(count>0) {
            console.log("Get profile details");

    var res = {};
    User.findOne({
        //     user_email: req.session.user
        user_email: email
     })  .select('user_name user_email user_phone user_about_me user_city user_country user_company user_school user_hometown user_language user_gender user_photo')
         .exec()
         .then(user => {
             if (user) {
                 console.log("record found" + user.user_phone);
                 console.log("user found" + user);
               //  res=({user: user, code: "200"});
                res=user
                 callback(null, res);
                 //res.status(200).json(user)
             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);
               // res.status(500).json({ error: err })
            })
        }}
        })
}

exports.handle_request = handle_request;


