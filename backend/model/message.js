var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
    user_email: {
        type: String
    },
    to_email: {
        type: String
    },
    subject: {
        type: String
    },
    message: {
        type: String
    }

})
module.exports = mongoose.model('messages',messageSchema);