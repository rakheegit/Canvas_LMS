import React, { Component } from 'react';
import { updateProfile } from "../actions/userActions";
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import axios from 'axios';


class UpdateProfile extends Component {

  constructor() {
    super()
    this.state = {
      user_photo: null
    }

//this.onChange = this.onChange.bind(this)
    this.onChange1 = this.onChange1.bind(this)
  }
   /*  
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    */
  
    onChange1 (e) {
        this.setState({user_photo: e.target.files[0]});
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
      
    onSubmit (values) {

    this.props.updateProfile(values,() => {
        console.log("i am here before push");
       // console.log()
        this.props.history.push('/dispProfile')
      });
      }
          

    render () {
        const { handleSubmit } = this.props;

        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
        return ( 
            <div className="content-wrapper">
            {redirectVar}
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <h1 className="h3 mb-3 font-weight-normal">Profile Update Form</h1>
         <Field
        name="user_name"
        label="Name"
        component={this.renderField}
      />
        <Field
          name="user_phone"
          label="Phone"
          component={this.renderField}
        />

        <Field
          name="user_about_me"
          label="About Yourself"
          component={this.renderField}
        />
        <Field
          name="user_city"
          label="You City"
          component={this.renderField}
        />
        <Field
        name="user_country"
        label="You Country"
        component={this.renderField}
      />  
      <Field
      name="user_company"
      label="Your Company"
      component={this.renderField}
    />
    <Field
    name="user_school"
    label="Your School"
    component={this.renderField}
  />
    <Field
      name="user_hometown"
      label="Your Hometown"
      component={this.renderField}
    />
    <Field
    name="user_language"
    label="Your Language"
    component={this.renderField}
  />  
  <Field
  name="user_gender"
  label="Your Gender"
  component={this.renderField}
/>  
                   
 <div style={{"padding":"10px"}}>
 <button type="submit" className="btn btn-primary">Submit</button>    
</div>
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
      errors.user_name = "Enter you Name";
    }
    if (!values.user_phone) {
      errors.user_phone = "Enter Phone";
    }
    if (!values.user_about_me) {
      errors.user_about_me = "Enter About Yourself";
    }
    if (!values.user_city) {
        errors.user_city = "Enter City";
      }
      if (!values.user_country) {
        errors.user_country = "Enter Country";
      }
      if (!values.user_company) {
        errors.user_company = "Enter Company";
      }
      if (!values.user_school) {
        errors.user_school = "Enter School";
      }
      if (!values.user_hometown) {
        errors.user_hometown = "Enter Hometown";
      }
      if (!values.user_language) {
        errors.user_language = "Enter Language";
      }
      if (!values.user_gender) {
        errors.user_gender = "Enter Gender";
      }
   //   if (!values.user_photo) {
   //     errors.user_photo = "Uploda Photo";
   //   }
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


  const mapStateToProps = state => (
    {
  rescode: state.status
});


export default reduxForm({
    validate,
    form: "ProfileUpdateForm"
  })(connect(mapStateToProps, { updateProfile })(UpdateProfile));

