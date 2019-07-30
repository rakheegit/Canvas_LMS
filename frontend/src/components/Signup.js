import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUp } from "../actions/userActions";
import PropTypes from 'prop-types';

class Signup extends Component {

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
        console.log("values: " + values);
        this.props.signUp(values, () => {
          console.log("i am here before push");
          console.log("rescode onsumbit: " + JSON.stringify(this.props.rescode))
          let stat_code = this.props.rescode
          let s_code = Object.keys(stat_code).map(function(key){ return stat_code[key] })
          if(s_code==201) {
            this.props.history.push("/signin");
          }
            else if(s_code==202){
            console.log("Response code 202!");
            this.setState({
                rcode : 202
            })}
            else if(s_code==500){
              this.setState({
                  rcode : 204
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
       if(this.state.rcode==202)
          det=  <div style={{"color":"red"}}>User already registered!</div>
          else if(this.state.rcode==500)
          det=  <div> Error! </div>
    

        return (
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                   
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <h1 className="h4 mb-3 font-weight-normal">Sign Up</h1>
                        {det}
       <Field
        name="user_name"
        label="Name"
        component={this.renderField}
      />
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
        <Field
          name="user_type"
          label="User Type"
          component={this.renderField}
        />
     
        <button type="submit" className="btn btn-primary">Submit</button>
    
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
    if (!values.user_name) {
      errors.user_name = "Enter your name";
    }
    if (!values.user_email) {
      errors.user_email = "Enter your email address";
    }
    if (!values.user_password) {
      errors.user_password = "Enter password";
    }
    if (!values.user_type) {
        errors.user_type = "Enter user type";
      }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


  const mapStateToProps = state => (
    {
  rescode: state.signup_status
});


export default reduxForm({
    validate,
    form: "SignupForm"
  })(connect(mapStateToProps, { signUp })(Signup));

