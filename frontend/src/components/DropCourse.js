import React, { Component } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';

class DropCourse extends Component {
    constructor() {
        super()
        this.state  = {
            courseDetails: [],
            rescode: 0
          };

        this.onChangeText = this.onChangeText.bind(this)
       this.onViewDetails = this.onViewDetails.bind(this)
       this.onDrop = this.onDrop.bind(this)
    }

    componentWillMount(){
        this.setState({
            rescode : 0
        })
    }
    onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onViewDetails (e) {
        e.preventDefault()

        axios.get('/course/courseget',{
            params:{course_id: this.state.course_id}
        })
        .then((response) => {
        //update the state with the response data
     
        this.setState({
            courseDetails : response.data
          
        });
    })
        .catch(err => {
            console.log(err)
        })
        
    
    }
  
    onDrop (e) {
        e.preventDefault()

        this.setState({
            details1  : this.state.courseDetails.map(course => {return course.course_name})
        })
      let details2 = ''
        details2 = this.state.courseDetails.map(course => {return course.course_id})
        let details3 = ''
        details3 = this.state.courseDetails.map(course => {return course.course_name})
        const token = localStorage.getItem('usertoken');
        console.log("token in enroll course" + token)
        console.log("course_name: " + details2.toString())

        axios.post('/users/checkusercourse', {
            course_id: details2.toString(),
            course_name: details3.toString()
        },{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}})
        .then(response => {
            console.log("printing response" + JSON.stringify(response))
            console.log("response1" +  JSON.stringify(response.data.user_courses))
            if(response.status === 200){
               console.log("1st Response code 200!");


        axios.post('/users/removecourse', {
                                 course_id: details2.toString(),
                                 course_name: details3.toString()
                             },{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}})
                             .then(response => {
                                 console.log("printing response" + JSON.stringify(response))
                                 console.log("response1" +  JSON.stringify(response.data.user_courses))
                                 if(response.status === 200){
                                    console.log("2nd Response code 200!");
                                 
                                 
                                    axios.post('/course/coursedrop', {
                                        //   course_id: this.state.course_id 
                                        courseDetails: this.state.courseDetails
                                       })
                                       .then(response => {
                                           console.log("printing response" + JSON.stringify(response))
                                           if(response.status === 200){
                                            console.log("3rd Response code 200!");
                                         
                                            this.setState({
                                                rescode : 200
                                            })
                                        }  else if(response.status === 500){
                                            this.setState({
                                                rescode : 500
                                            }) 
                                        }
                                        })
                                        .catch(err => console.log(err))
                                        
                                        }                               
                        })
                        .catch(err => console.log(err))
            }
            else if(response.status === 204){
                this.setState({
                  rescode : 204
                })
            }
        })
        .catch(err => console.log(err))
                }
                               

                
/*
         axios.post('/course/coursedrop', {
                 //   course_id: this.state.course_id 
                 courseDetails: this.state.courseDetails
                })
                .then(response => {
                    console.log("printing response" + JSON.stringify(response))
                  
                    if(response.status === 200){
                        console.log("Response code 200!");
                     
                        this.setState({
                            rescode : 200
                        })
                        this.setState({
                            details1  : this.state.courseDetails.map(course => {return course.course_name})
                        })
                      let details2 = ''
                        details2 = this.state.courseDetails.map(course => {return course.course_id})
                        let details3 = ''
                        details3 = this.state.courseDetails.map(course => {return course.course_name})
                        const token = localStorage.getItem('usertoken');
                        console.log("token in enroll course" + token)
                        console.log("course_name: " + details2.toString())
                        */
                 /*       axios.post('/users/removecourse', {
                                 course_id: details2.toString(),
                                 course_name: details3.toString()
                             },{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}})
                             .then(response => {
                                 console.log("printing response" + JSON.stringify(response))
                                })
                                .catch(err => console.log(err))

                    }else if(response.status === 203){
                        
                        this.setState({
                            rescode : 203
                        })
                        
                    }else if(response.status === 204){
                        this.setState({
                            rescode : 204
                        }) 
                    }
                })
                .catch(err => console.log(err))
        }
*/

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
        console.log("droprescode: " + this.state.rescode) 
        let det = ''
                     if(this.state.rescode==200){
               det=  <div>Course dropped successfully!</div>
             }
        
             else if(this.state.rescode==204){
                console.log("droprescode22: " + this.state.rescode) 
             det=  <div style={{"color":"red"}}> Error! You are not enrolled to this course. </div>
             }
        let details = [];
        details = this.state.courseDetails.map(course => {

            return(
                <tr>
                <td>{course.course_id}</td>
                <td>{course.course_dep}</td>
                <td>{course.course_name}</td>
                <td>{course.course_term}</td>
                <td>{course.course_room}</td>
                <td>{course.course_cap}</td>
                <td>{course.course_wl_cap}</td>
               
                <td>{course.course_enrollment_count}</td>
                <td>{course.course_wl_count}</td>
                </tr>
              
            )

        })


        return(
            <div>    
            <div class="content-wrapper">
            {redirectVar}
            <section className="content-header">
            <div className="container">
            <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.drop}>

                        <div class="panel">
                            <h2 className="h2 mb-3 font-weight-normal">Drop Course</h2>
                            <p>Enter Course ID</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.onChangeText} type="text" class="form-control" name="course_id" placeholder="Enter Course ID"  value={this.state.course_id}
                                onChange={this.onChangeText}/>
                            </div>
                            <button id="btn_space" type="submit" onClick = {this.onViewDetails} class="btn btn-primary">View Details</button> 
                            <button type="submit" onClick = {this.onDrop} class="btn btn-primary">Drop</button>          
                            {det}
                            </form>
                </div>
                </div>
               </div>
               <div>
               <div class="container">
             
                           <table  style={{"top":"300px","left":"20px"}} >
                               <thead>
                                   <tr>
                                       <th>ID</th>
                                       <th>Dept</th>
                                       <th>Name</th>
                                       <th>Term</th>
                                       <th>Room</th>
                                       <th>Max Capacity</th>
                                       <th>WL Cap</th>
                                       <th>Enrolled</th>
                                       <th>WL</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {details}
                               </tbody>
                           </table>
                         
                   </div> 
       </div>
            </section>
            </div>
            </div>
        )
    }
}

export default DropCourse