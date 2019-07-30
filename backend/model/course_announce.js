var mongoose = require('mongoose');
var announceSchema = mongoose.Schema({
        course_id: {
            type: String,
            primaryKey: true
        },
        title: {
            type: String
        },
        posted_on: {
            type: String
        },
        content: {
            type: String
        }
    })
 module.exports = mongoose.model('announces',announceSchema);