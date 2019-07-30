import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import "./testcourse.css";
import ListItem from "./ListItem";
import _ from "lodash";

  

class Announce extends Component {
    
    constructor() {
        super()
        this.state = {
           courses:[]
        }
    }

    componentDidMount () {
        
        axios.get('/studentcourse',{
            user_email: this.state.courses.course_1
        })
        .then((response) => {
             console.log("printing response" + JSON.stringify(response))
        //update the state with the response data
     
        this.setState({
            courses : this.state.courses.concat(response.data) 
          
        });
    })
        .catch(err => {
            console.log(err)
        }) 
}
handleOnClick = id => {
  const courses = _.cloneDeep(this.state.courses);

  for (let course of courses) {
    if (course.id === id) {
      //course.completed = !course.completed;
      break;
    }
  }

  this.setState({ courses });
};
render() {
  const { courses } = this.state;

  return (
    <div class="content-wrapper">
         <section className="content-header">
         <div className="container">
             <div className="row">
                 <div className="col-md-6 mt-5 mx-auto">
                 <div className="form-group">
    <div className="Tile">
      <h1>Courses</h1>
      <ul style={{ "width": "20%"}}>
        {courses.map(chore => (
          <ListItem
            key={chore.id}
            id={chore.id}
            course_1={chore.course_1}
     //       course_2={chore.course_2}
    //        course_name={chore.course_name}
    //        course_dep={chore.course_dep}
    //        course_term={chore.course_term}
            handleOnClick={this.handleOnClick}
          />
        ))}
      </ul>
      
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
  );
}
}
export default Announce;