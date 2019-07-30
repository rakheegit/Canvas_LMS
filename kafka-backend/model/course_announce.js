var mongoose = require('mongoose');

const db = require("./dbconn")

var announceSchema = mongoose.Schema({
        course_id: {
            type: String,
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
 Announce = module.exports = mongoose.model('announces',announceSchema);
 module.exports = Announce