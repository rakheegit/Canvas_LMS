import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import DispProfile from './DispProfile';
import UpdateProfile from './UpdateProfile';
import UpdatePhoto from './UpdatePhoto';
import Dashboard from './Dashboard';
import Search from './Search';
import EnrollCourse from './EnrollCourse';
import DropCourse from './DropCourse';
import CreateCourse from './CreateCourse';
import GenCode from './GenCode';
import CourseMenu from './CourseMenu';
import Assignment from './Assignment';
import Quiz from './Quiz/Quiz';
import Inbox from './Inbox/Inbox';
import Messages from './Inbox/Messages';
import NewMessage from './Inbox/NewMessage';
import AddQuestion from './Quiz/AddQuestion';
import GradeAssignment from './GradeAssignment';
import GradeEntry from './GradeEntry';
import SubmissionViewer from './SubmissionViewer';
import ViewSub from './ViewSub';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
        
                <Switch>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup} />
                <Route  path="/" component={Home}/>
                </Switch>
                
                <Route path="/dispProfile" component={DispProfile}/>
                <Route path="/updateProfile" component={UpdateProfile}/>
                <Route path="/updatePhoto" component={UpdatePhoto}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/search" component={Search}/>
                <Route path="/enrollCourse" component={EnrollCourse}/>
                <Route path="/dropCourse" component={DropCourse}/>
                <Route path="/createCourse" component={CreateCourse}/>
                <Route path="/genCode" component={GenCode}/>
                <Route path="/inbox" component={Inbox}/>
                <Route path="/newMessage" component={NewMessage}/>
                <Route path="/ViewSub" component={ViewSub}/>
               
              
                
  
              
           {/*        <Route path="/courseMenu" render={(props)=> <Dashboard{...props} targetId={""}/>} /> */}
          {/*      <Route exact strict path="/dashboard/:handle" component={Assignment} /> */}
          <Route exact  path="/dashboard/genCode/:course_id/:quiz_id" render={(props)=> <Quiz{...props} targetId={""}/>} />
          <Route exact  path="/dashboard/assigns/:course_id/:assn_id" render={(props)=> <Assignment{...props} targetId={""}/>} />
          <Route  path="/dashboard/course/:courseid/:user_type" render={(props)=> <CourseMenu{...props} targetId={""} />} />
          <Route path="/dashboard/AddQuestion/:course_id" render={(props)=> <AddQuestion{...props} targetId={""} />} /> 
          <Route path="/dashboard/Grade/:course_id" render={(props)=> <GradeAssignment{...props} targetId={""} />} /> 
          <Route path="/dashboard/GradeEntry/:course_id/:user_email/:total_points/:assn_id/:title" render={(props)=> <GradeEntry{...props} />} /> 
           <Route path="/dashboard/ViewSubmission/:user_email/:assn_id" render={(props)=> <SubmissionViewer{...props} />} />
          <Route exact  path="/_inbox/messages/:subjectmsg" render={(props)=> <Messages{...props} subject={""} />} /> 
            </div>
        )
        
    }
}
//Export The Main Component
export default Main;