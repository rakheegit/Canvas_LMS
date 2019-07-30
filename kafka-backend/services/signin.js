const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

console.log("in signin service")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};
console.log("signin email:" + msg.user_email )
   

User.findOne({
    user_email: msg.user_email
})
.exec()
.then(user => {
    if (user) {
       console.log("inside first if"+ JSON.stringify(user));
       console.log("user and pwd : " + msg.user_password + user.user_password);

       if (bcrypt.compareSync(msg.user_password, user.user_password)) {
           console.log("inside second if ")
           //req.session.user = req.body.user_email;
          
           console.log("after cookie: " + user.user_email + " " + user.user_type)

           var payload={user_email:user.user_email,user_type:user.user_type}
           var token = jwt.sign(payload, 'studentuserkey', {
               expiresIn: 604800
           })
           //res.send(token)
           console.log("token sent: " + token);
           console.log(" 200 successful login");
           res=({user: token, status: "true", code: "200"});
            callback(null, res);
       }  else {
           console.log("201 Incorrect password");
           res=({user: user, status: "true", code: "201"});
           callback(null, res);
       }
       
   } else {
       console.log("203 : user not found");
       res=({code: "203"});
       callback(null, res);
      // res.status(203).json({ error: 'User is not registered' })
   }
})
.catch(err => {
    console.log(err);
    res=({ code: "500"});
    callback(null, res);
   // res.status(500).json({ error: err })
})
       
}

exports.handle_request = handle_request;
