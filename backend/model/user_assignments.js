var mongoose = require('mongoose');
var userAssignSchema = mongoose.Schema({
        course_id: {
            type: String
        },
        title: {
            type: String
        },
        assn_id: {
            type: String
        },
        submitted_on: {
            type: String
        },
        user_file: {
            type: String
        },
        user_email: {
            type: String
        },
        total_points: {
            type: Number
        }
        
    })
    const UserAssign =  module.exports = mongoose.model('user_assignments',userAssignSchema);

module.exports = UserAssign;
