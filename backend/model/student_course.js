var mongoose = require('mongoose');
var studentCourseSchema = mongoose.Schema({

user_email: {
    type: String, 
},
user_course: {
    type: String, 
},
course_assignment1: {
    type: String, 
},
course_assignment2: {
    type: String
},
course_assignment1_grade: {
    type: String
},
course_assignment2_grade: {
    type: String
},
course_quiz1: {
    type: String
},
course_quiz2: {
    type: String
},
course_quiz1_grade: {
    type: String
},
course_quiz2_grade: {
    type: String
}
});

const student_course = module.exports = mongoose.model('studentCourse',studentCourseSchema);