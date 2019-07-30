const express = require('express');
const app = express();
//const app = express.Router()
const mysql = require('mysql');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer  = require('multer')
var multiparty = require('multiparty');
var fs = require('fs');
//var multer = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var FormData = require('form-data');
var Sequelize = require('sequelize');
var mongoose = require("mongoose");
const passport = require('passport');
var User = require("./model/user");
var kafka = require('./kafka/client');

// Passport Config
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


//mongo connection
mongoose.connect(
    "mongodb+srv://canvas_user:2407Rakhee%21@cluster0-jjkgt.mongodb.net/canvasdb?poolSize=10?retryWrites=true",
 //  "mongodb+srv://canvas_user:2407Rakhee%21@cluster0-jjkgt.mongodb.net/canvasdb?retryWrites=true",
    {
      useNewUrlParser: true,
   //   autoReconnect: true,
    //  reconnectTries: Number.MAX_VALUE,
     // keepAlive: true,
      //connectTimeoutMS: 6000,
     // socketTimeoutMS: 6000
    }
  );
  mongoose.connection.on("connected", () => {
    console.log("Connected to database!");
  });
  mongoose.connection.on("error", err => {
    console.log(err);
  });

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  jwtOptions.secretOrKey = 'studentuserkey';
  
  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    return User.findOne({
        user_email: jwt_payload.user_email,
        user_type: jwt_payload.user_type
      })
      .then(user => {
        if (user) {
            return next(null, user);
          } else {
            return next(null, false);
          }
        });
        })

 //   var user = users[_.findIndex(users, {id: jwt_payload.id})];
  
  
  passport.use(strategy);

  app.use(require('express-session')({
    secret: 'keyboardsecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
//app.use(passport.session());

const Op = Sequelize.Op;
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(cors());
process.env.SECRET_KEY = 'secret'

//use express session to maintain session data
//
app.use(cookieParser());
//app.use('/', routes);
app.use(express.static('public'));
app.use(sessions({
    secret              : 'cmpe273_secret',
    resave              : true, 
    saveUninitialized   : true, 
    duration            : 60 * 60 * 1000,    // duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 //   res.Header('Cache-Control', 'no-cache');
  //  res.Header('content-type', 'text/html');
    next();
  });

app.use('/profile_uploads',express.static('profile_uploads'));

const file_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("in cb file destination : ",file.originalname);
        cb(null, './profile_uploads/')
    },
    filename: function (req, file, cb) {
        console.log("in cb file Body : ",file.originalname);
      cb(null, new Date().toISOString() + file.originalname)
    }
  })

  const fileFilter = (req,file,cb) => {
      //store a file
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
      cb(null,true)
else 
      //reject a file
      cb(null,false)
  }

  const upload = multer({ storage: file_storage ,fileFilter:fileFilter});
  //var upload = multer({ storage: file_storage ,fileFilter:fileFilter}).single('common_name');


  

app.use('/users', require('./routes/users.js'))
app.use('/course', require('./routes/course.js'))

//module.exports = app



const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log(`server started on port ${port}`);
});
