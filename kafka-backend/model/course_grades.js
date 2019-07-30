var mongoose = require('mongoose');
const db = require("./dbconn")

var gradeSchema = mongoose.Schema({
        course_id: {
            type: String
        },
        task_id: {
            type: String
        },
        task_type: {
            type: String
        },
      
        task_title: {
            type: String
        },
        task_grade: {
            type: Number,default: 0
        },
        task_outof: {
            type: Number,default: 0
        },
        user_email: {
            type: String
        }
    })
 module.exports = mongoose.model('grades',gradeSchema);