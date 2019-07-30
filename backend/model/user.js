var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
user_name: {
    type: String, required: true
},
user_email: {
    type: String, required: true
},
user_password: {
    type: String, required: true
},
user_type: {
    type: String, required: true
},
user_about_me: {
    type: String
},
session_id: {
    type: String
},
user_phone: {
    type: String
},
user_about_me: {
    type: String
},
user_city: {
    type: String
},
user_country: {
    type: String
},
user_company: {
    type: String
},
user_school: {
    type: String
},
user_hometown: {
    type: String
},
user_language: {
    type: String
},
user_gender: {
    type: String
},
user_photo: {
    type: String
},
user_courses: [{
    course_id: {type: String},
    course_name: {type: String},
    assignments:[{ title:{type:String },assn_id:{type:String},user_file: { type:String } }]
}]
});

const User = module.exports = mongoose.model('users',userSchema);

module.exports = User;