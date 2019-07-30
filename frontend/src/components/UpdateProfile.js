import React, { Component } from 'react';
import { updateProfile, fetchProfile } from "../actions/userActions";
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";


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

      componentDidMount() {
        //call to action
        this.handleInitialize();
        
      }

      handleInitialize() {


        let name =  _.map(this.props.profile, prof => {  return  prof.user_name  })
        let email =  _.map(this.props.profile, prof => { return  prof.user_email    })  
        let phone =  _.map(this.props.profile, prof => { return  prof.user_phone   })
        let about_me =  _.map(this.props.profile, prof => {  return  prof.user_about_me})
        let city =  _.map(this.props.profile, prof => {  return  prof.user_city})
        let country =  _.map(this.props.profile, prof => {  return  prof.user_country})
        let company =  _.map(this.props.profile, prof => {  return  prof.user_company})
        let school =  _.map(this.props.profile, prof => {  return  prof.user_school})
        let hometown =  _.map(this.props.profile, prof => {  return  prof.user_hometown})    
        let language =  _.map(this.props.profile, prof => {  return  prof.user_language})   
        let gender =  _.map(this.props.profile, prof => {  return  prof.user_gender})   

        
            const initData = {
              "user_name": name[0],
              "user_email": email[0],
              "user_phone": phone[0],
              "user_about_me": about_me[0],
              "user_city": city[0],
              "user_country": country[0],
              "user_company": company[0],
              "user_school": school[0],
              "user_hometown": hometown[0],
              "user_language": language[0],
              "user_gender": gender[0]
            };
        
            this.props.initialize(initData);
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

        let name =  _.map(this.props.profile, prof => {  return  prof.user_name  })
     


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
                            <h2 style={{ color: "blue" }} className="h2 mb-3 font-weight-normal"> {name} </h2>
                         
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

    if (!values.user_city) {
        errors.user_city = "Enter City";
      }
      if (!values.user_country) {
        errors.user_country = "Enter Country";
      }
      if (!values.user_company) {
        errors.user_company = "Enter Company";
      }
 
   //   if (!values.user_photo) {
   //     errors.user_photo = "Uploda Photo";
   //   }
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

/*
  const mapStateToProps = state => (
    {
  rescode: state.status
});


export default reduxForm({
    validate,
    form: "ProfileUpdateForm"
  })(connect(mapStateToProps, { updateProfile })(UpdateProfile));

*/

function mapStateToProps(state)
{
 
return{
rescode: state.status,
profile: state.profile.items,

} 
}

UpdateProfile = reduxForm({
validate,
form: 'ProfileUpdateForm'
})(UpdateProfile)


UpdateProfile = connect(mapStateToProps, { fetchProfile, updateProfile })(UpdateProfile);

export default UpdateProfile;