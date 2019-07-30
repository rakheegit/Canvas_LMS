var connection =  new require('./kafka/Connection');
//topics files
var Profilepic = require('./services/profilepic.js');
var Signup = require('./services/signup.js');
var Signin = require('./services/signin.js');
var MessageList = require('./services/messagelist.js');
var CourseDetails = require('./services/coursedetails.js');
var Profile = require('./services/profile.js');
var UpdateProfile = require('./services/updateprofile.js');
var MsgBySubject = require('./services/msgBySubject.js');
var Replytomsg = require('./services/replytomsg.js');
var GetCourses = require('./services/get_courses.js');
var AddCourse = require('./services/addcourse.js');
var Announcement = require('./services/announcement.js');
var Assignment = require('./services/assignment.js');
var GetAnnouncements = require('./services/getAnnouncements.js');
var GetAssignments = require('./services/getAssignments.js');
var GetAssignmentById = require('./services/getAssignmentById.js');
var GetQuizById = require('./services/getQuizById.js');
var SubAssigns = require('./services/subassigns.js');
var GetLectures = require('./services/getLectures.js');
var CheckUserCourse = require('./services/checkusercourse.js');
var RemoveStudent = require('./services/removestudent.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("get_courses",GetCourses)
handleTopicRequest("coursedetails",CourseDetails)
handleTopicRequest("profile",Profile)
handleTopicRequest("updateprofile",UpdateProfile)
handleTopicRequest("messagelist",MessageList)
handleTopicRequest("msgBySubject",MsgBySubject)
handleTopicRequest("replytomsg",Replytomsg)
handleTopicRequest("signin",Signin)
handleTopicRequest("signup",Signup)
handleTopicRequest("profilepic",Profilepic)
handleTopicRequest("addcourse",AddCourse)
handleTopicRequest("announcement",Announcement)
handleTopicRequest("assignment",Assignment)
handleTopicRequest("getAnnouncements",GetAnnouncements)
handleTopicRequest("getAssignments",GetAssignments)
handleTopicRequest("getAssignmentById",GetAssignmentById)
handleTopicRequest("getQuizById",GetQuizById)
handleTopicRequest("subassigns",SubAssigns)
handleTopicRequest("getLectures",GetLectures)
handleTopicRequest("checkusercourse",CheckUserCourse)
handleTopicRequest("removestudent",RemoveStudent)