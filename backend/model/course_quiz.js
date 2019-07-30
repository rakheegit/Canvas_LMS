var mongoose = require('mongoose');
var quizSchema = mongoose.Schema({
        course_id: {
            type: String,
        },
        title: {
            type: String
        },
        posted_on: {
            type: String
        },
        due_date: {
            type: String
        },
        questions: [{
            question: {
                type: String
            },
            answers: [
                {
                    is_correct: {type: Boolean}
                ,
                    value: {type: String}
                }
                    ]

        }]
        
        
    })
    const Quiz =  module.exports = mongoose.model('quiz',quizSchema);

module.exports = Quiz;
