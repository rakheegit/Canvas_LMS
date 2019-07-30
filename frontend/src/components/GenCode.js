import React, { Component } from 'react';
//import { genCode } from './myfunctions';
import {Redirect} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';

class GenCode extends Component {
    constructor() {
        super()
        this.state  = {
            courseDetails: [],
            course_wl_cap: '',
            arr:[]
      //      enrollStatus: false
          };

        this.onChangeText = this.onChangeText.bind(this)
       this.onViewDetails = this.onViewDetails.bind(this)
       this.onGenCode = this.onGenCode.bind(this)
    }
    onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onViewDetails (e) {
        e.preventDefault()

        axios.get('/courseget',{
            params:{course_id: this.state.course_id}
        })
        .then((response) => {
        //update the state with the response data
     
        this.setState({
            courseDetails : this.state.courseDetails.concat(response.data)
         
        });
       
    })
        .catch(err => {
            console.log(err)
        })
        
    
    }
  
    onGenCode (e) {
        e.preventDefault()

        let arr = [];
        arr = Array.from({length: 6 }, () => Math.floor(Math.random() * 9));
      while(arr.length < 8){
        var r = Math.floor(Math.random()*100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
        console.log("arr new : " + arr);
        

        this.setState({
            course_wl_cap : this.state.course_wl_cap,
            arr: this.state.arr
         
        });
       console.log("cap : " + this.state.course_wl_cap)

    }


    render(){
     
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }

        let details = [];
        details = this.state.courseDetails.map(course => {
         
            return(
                <tr>
                <td>{course.course_id}</td>
                <td>{course.course_dep}</td>
           
                <td>{course.course_term}</td>
          
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
                        <h2 className="h2 mb-3 font-weight-normal">Generate Permission Code</h2>
                            <p>Enter Course ID</p>
                        </div>
                        
                            <div class="form-group">
                                <input type="text" class="form-control" name="course_id" placeholder="Enter Course ID"  value={this.state.course_id}
                                onChange={this.onChangeText}/>
                            </div>
                            <button id="btn_space" type="submit" onClick = {this.onViewDetails} class="btn btn-primary">Waitlist Count</button> 
                            <button type="submit" onClick = {this.onGenCode} class="btn btn-primary">Generate Code</button>          
                </form>
                </div>
                </div>
               </div>
               <div>
               <div style={{"margin-left":"190px"}} class="container">
                           <table >
                               <thead>
                                   <tr>
                                       <th>ID</th>
                                       <th>Dept</th>
                                       <th>Term</th>
                                       <th>Max Capacity</th>
                                       <th>WL Cap</th>
                                       <th>Enrolled</th>
                                       <th>WL</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {details}
                               </tbody>
                               {this.state.arr}
                           </table>
                   </div> 
       </div>
            </section>
            </div>
            </div>
        )
    }
}

export default GenCode