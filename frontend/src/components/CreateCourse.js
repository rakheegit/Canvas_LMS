import React, { Component } from 'react'
//import { enroll,createCourse } from './myfunctions'
import './testcourse.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createCourse } from "../actions/courseActions";
import axios from 'axios';

class CreateCourse extends Component {
    componentWillMount(){
        this.setState({
            rcode : 0
        })
    }


    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="text" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }
      /*
    constructor() {
        super()
        this.state = {
            course_id: '',
            course_name: '',
            course_dep: '',
            course_desc: '',
            course_room: '',
            course_cap: '',
            course_wl_cap: '',
            course_term: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const course = {
            course_id: this.state.course_id,
            course_name: this.state.course_name,
            course_dep: this.state.course_dep,
            course_desc: this.state.course_desc,
            course_room: this.state.course_room,
            course_cap: this.state.course_cap,
            course_wl_cap: this.state.course_wl_cap,
            course_term: this.state.course_term
        }

        createCourse(course).then(res => {
           
        })
        enroll(course).then(res => {
            console.log("this.props.history: " + JSON.stringify(this.props.history))
        //    this.props.history.push('/dashboard')
        }) 
        
    }
    */
   onSubmit(values) {
    console.log("values: " + values);
    console.log("courseid value: " + values.course_id);
    this.props.createCourse(values, () => {
      console.log("i am here before push");
      console.log("rescode onsumbit: " + this.props.rescode)
      console.log("rescode onsumbit1: " + JSON.stringify(this.props.rescode))
      let stat_code = this.props.rescode
      const token = localStorage.getItem('usertoken');
      let s_code = Object.keys(stat_code).map(function(key){ return stat_code[key] })
      if(s_code==201) {
        console.log("Response code 202!");
        this.setState({
            rcode : 201
        })
        axios.post('/users/addcourse', {
            course_id: values.course_id,
            course_name: values.course_name
        },{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}})
        .then(response => {
            console.log("printing response" + JSON.stringify(response))
           })
           .catch(err => console.log(err))
      //  this.props.history.push("/dashboard");
      }
        else if(s_code==202){
        console.log("Response code 202!");
        this.setState({
            rcode : 202
        })}
        else if(s_code==500){
          this.setState({
              rcode : 500
          }) 
      }
      
  //    if(Object.keys(this.props.rescode).map(function(key){ return this.props.rescode[key] })=='201')
   //   this.props.history.push("/signin");
    });
  }

    render () {

        const { handleSubmit } = this.props;

        console.log("rescode: " + JSON.stringify(this.props.rescode))
        let det = ''
        if(this.state.rcode==201)
           det=  <div style={{"color":"blue"}}>Course created!</div>
        if(this.state.rcode==202)
           det=  <div style={{"color":"red"}}>Course already exists for this term!</div>
           else if(this.state.rcode==500)
           det=  <div> Error! </div>

           return (
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                   
                        <form style={{"margin-left":"200px"}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <h1 className="h4 mb-3 font-weight-normal">Create a Course</h1>
                        {det}
       <Field
        name="course_id"
        label="Course Id"
        component={this.renderField}
      />
        <Field
          name="course_dep"
          label="Department"
          component={this.renderField}
        />

        <Field
          name="course_name"
          label="Course Name"
          component={this.renderField}
        />
        <Field
          name="course_term"
          label="Term"
          component={this.renderField}
        />
        <Field
        name="course_desc"
        label="Course Description"
        component={this.renderField}
      />
        <Field
          name="course_room"
          label="Class Room Number"
          component={this.renderField}
        />

        <Field
          name="course_cap"
          label="Course Capacity"
          component={this.renderField}
        />
        <Field
          name="course_wl_cap"
          label="Waitlist Capacity"
          component={this.renderField}
        />
     
        <button type="submit" className="btn btn-primary">Create</button>
    {det}
      </form>
      
                    
                    </div>
                </div>
            </div>
            </section>
            </div>
        )
    }
}
function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.course_id) {
      errors.course_id = "Enter Course Id";
    }
    if (!values.course_dep) {
      errors.course_dep = "Enter Department";
    }
    if (!values.course_name) {
      errors.course_name = "Enter Course Name";
    }
    if (!values.course_term) {
        errors.course_term = "Enter Course Term";
      }
      if (!values.course_desc) {
        errors.course_desc = "Enter Course Description";
      }
      if (!values.course_room) {
        errors.course_room = "Enter Class Room Number";
      }
      if (!values.course_cap) {
        errors.course_cap = "Enter Course Capacity";
      }
      if (!values.course_wl_cap) {
          errors.course_wl_cap = "Enter Waitlist Capacity";
        }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


  const mapStateToProps = state => (
    {
  rescode: state.createcourse_status
});


export default reduxForm({
    validate,
    form: "CreateCourseForm"
  })(connect(mapStateToProps, { createCourse })(CreateCourse));


/*
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
        return (
            <div class="content-wrapper">
            {redirectVar}
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 style={{"margin-top":"20px"}}>Enter New Course Details</h1>
                            <div className="form-group">
                                <label htmlFor="course_id">Course ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_id"
                                    placeholder="Enter Course ID"
                                    value={this.state.course_id}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course_dep">Course Department</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_dep"
                                    placeholder="Enter Department"
                                    value={this.state.course_dep}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course_name">Course Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_name"
                                    placeholder="Enter Course Name"
                                    value={this.state.course_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course_term">Course Term</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_term"
                                    placeholder="Enter Term"
                                    value={this.state.course_term}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="course_desc">Description</label>
                            <input type="text"
                                className="form-control"
                                name="course_desc"
                                placeholder="Enter Description"
                                value={this.state.course_desc}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_room">Class Room</label>
                            <input type="text"
                                className="form-control"
                                name="course_room"
                                placeholder="Enter Classroom number"
                                value={this.state.course_room}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_cap">Course Capacity</label>
                            <input type="text"
                                className="form-control"
                                name="course_cap"
                                placeholder="Enter Course Capacity"
                                value={this.state.course_cap}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_wl_cap">Waitlist Capacity</label>
                            <input type="text"
                                className="form-control"
                                name="course_wl_cap"
                                placeholder="Enter Waitlist Capacity"
                                value={this.state.course_wl_cap}
                                onChange={this.onChange}
                            />
                        </div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Create Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </section>
            </div>
        )
    }
}

export default CreateCourse
*/