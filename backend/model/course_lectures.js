var mongoose = require('mongoose');
var lectureSchema = mongoose.Schema({
        course_id: {
            type: String
        },
       
        user_file: {
            type: String
        },
        posted_on: {
            type: String
        }
        
    })
    const Lectures =  module.exports = mongoose.model('course_lectures',lectureSchema);

module.exports = Lectures;
