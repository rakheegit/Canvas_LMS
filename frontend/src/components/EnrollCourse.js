import React, { Component } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';

class EnrollCourse extends Component {
    constructor() {
        super()
        this.state  = {
            courseDetails: [],
            rescode: 0,
            course_cap:'',
            details1 :''
          }

        this.onChangeText = this.onChangeText.bind(this)
       this.onViewDetails = this.onViewDetails.bind(this)
       this.onEnroll = this.onEnroll.bind(this)
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
            console.log("cap in setstate: " + JSON.stringify(response.data))

        //update the state with the response data
     
        this.setState({
            courseDetails : response.data
   
        });
    })
        .catch(err => {
            console.log(err)
        })
    
    }
  
    onEnroll (e) {
    
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
            if(response.status === 204){
               console.log("Response code 204! Course yet to enroll");

               axios.post('/users/addcourse', {
                course_id: details2.toString(),
                course_name: details3.toString()
            },{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}})
            .then(response => {
                console.log("printing response" + JSON.stringify(response))
                if(response.status === 200){
                    console.log("2nd Response code 200!");
      
                axios.post('/course/courseenrollment', {
               //     course_id: this.state.course_id,
                    courseDetails: this.state.courseDetails
                })
                .then(response => {
                    console.log("printing response" + JSON.stringify(response))
                  
                    if(response.status === 200){
                        console.log("3rd Response code 200!");
                     
                        this.setState({
                            rescode : 200
                        })
                    }  else if(response.status === 203){
                        this.setState({
                            rescode : 203
                        }) 
                    }
                    else if(response.status === 202){
                        this.setState({
                            rescode : 202
                        }) 
                    }
                    })
                    .catch(err => console.log(err))
                    
                    }                               
    })
    .catch(err => console.log(err))
}
else if(response.status === 200){
this.setState({
rescode : 100
})
}
})
.catch(err => console.log(err))
}
      
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
        console.log("rescode: " + this.state.rescode) 
   let det = ''
                if(this.state.rescode==200){

          det=  <div>Enrollment successful!</div>
          //this.props.history.push('/enrollstudent')
        }

        else if(this.state.rescode==203)
        det=  <div> Course Capacity reached, you are in Waiting list.</div>
        else if(this.state.rescode==202)
        det=  <div style={{"color":"red"}}> Waitlist Full! Cannot enroll.</div>
        else if(this.state.rescode==100)
        det=  <div style={{"color":"red"}}> Error! Course already enrolled.</div>

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
            <form noValidate onSubmit={this.enroll}>

                        <div class="panel">
                        <h3 className="h3 mb-3 font-weight-normal">Course Enrollment Spring 2019</h3>
                            <p>Enter Course ID</p>
                        </div>
                        
                            <div class="form-group">
                                <input type="text" class="form-control" name="course_id" placeholder="Enter Course ID"  value={this.state.course_id}
                                onChange={this.onChangeText}/>
                            </div>
                            <button id="btn_space" type="submit" onClick = {this.onViewDetails} class="btn btn-primary">View Details</button> 
                            <button type="submit" onClick = {this.onEnroll} class="btn btn-primary">Enroll</button>          
                            {det}
                            </form>
                </div>
                </div>
               </div>
               <div>
               <div class="container">
                           <table  style={{"top":"320px","left":"20px"}}>
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

export default EnrollCourse