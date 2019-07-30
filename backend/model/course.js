var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
        course_id: {
            type: String,
            primaryKey: true
        },
        course_name: {
            type: String
        },
        course_dep: {
            type: String
        },
        course_desc: {
            type: String
        },
        course_term: {
            type: String
        },
        course_room: {
            type: String
        },
        course_cap: {
            type: Number, default: 0
        },
        course_wl_cap: {
            type: Number, default: 0
        },
        course_enrollment_count: {
            type: Number, default: 0
        },
        course_wl_count: {
            type: Number, default: 0
        },
        course_creator: {
            type: String
        }
    })
    const Course = module.exports = mongoose.model('courses',courseSchema);