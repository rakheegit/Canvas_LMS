import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import "../App.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signin } from "../actions/userActions";



class Signin extends Component{

    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.onSignup = this.onSignup.bind(this);
    }
    componentWillMount(){
        this.setState({
            rcode : 0,
            user_type: cookie.load('cookie')
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
    
      renderField1(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="password" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }


      onSubmit(values) {
        console.log("values: " + JSON.stringify(values));
        this.props.signin(values, () => {
          console.log("i am here before push");
          console.log("rescode onsumbit11: " + this.props.rescode)
          console.log("rescode onsumbit: " + JSON.stringify(this.props.rescode))
          let stat_code = this.props.rescode
          let s_code = Object.keys(stat_code).map(function(key){ return stat_code[key] })
          if(s_code==200) {
            console.log("Response code 200!");
            this.setState({
                rcode : 200
            })}
            else if(s_code==201){
            console.log("Response code 202!");
            this.setState({
                rcode : 201
            })}
            else if(s_code==203){
              this.setState({
                  rcode : 203
              }) 
          }
          
      //    if(Object.keys(this.props.rescode).map(function(key){ return this.props.rescode[key] })=='201')
       //   this.props.history.push("/signin");
        });
      }

      onSignup(){
        this.props.history.push('/signup')
      }

    
    render(){

        const { handleSubmit } = this.props;

        console.log("rescode: " + JSON.stringify(this.props.rescode))
        
        let det = ''
        if(this.state.rcode==200){
          console.log(this.props.history)
        this.props.history.push("/");
        }
       else if(this.state.rcode==201)
           det=  <div style={{"color":"red"}}>Incorrect password!</div>
           else if(this.state.rcode==203)
           det=  <div style={{"color":"red"}}> User is not registered! </div>
  
        
        return(
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                   
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <h2 className="h3 mb-3 font-weight-normal">Sign In to Canvas</h2>
                        {det}
        <Field
          name="user_email"
          label="Email"
          component={this.renderField}
        />

        <Field
          name="user_password"
          label="Password"
          component={this.renderField1}
          type="password"
        />
        <button id="btn_space" type="submit" className="btn btn-primary">Sign In</button>
        <button type="submit" onClick = {this.onSignup} class="btn btn-primary">Sign Up </button>  
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
    if (!values.user_email) {
      errors.user_email = "Enter you email address";
    }
    if (!values.user_password) {
      errors.user_password = "Enter password";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


  const mapStateToProps = state => (
    {
  rescode: state.signin_status
});


export default reduxForm({
    validate,
    form: "SigninForm"
  })(connect(mapStateToProps, { signin })(Signin));