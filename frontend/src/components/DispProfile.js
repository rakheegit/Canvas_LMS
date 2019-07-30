import React, { Component } from 'react'
import "../App.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from "../actions/userActions";
import _ from "lodash";

  

class DispProfile extends Component {
    
    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmit1 = this.onSubmit1.bind(this)
    }
    componentWillMount() {
        //call to action
        this.props.fetchProfile();
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
          this.props.posts.unshift(nextProps.newPost);
        }
      }
      onSubmit (e) {
        e.preventDefault()
        console.log("in onsubmit profile")
        this.props.history.push('/updateProfile')
    }
    onSubmit1 (e) {
        e.preventDefault()
        console.log("in onsubmit photo")
        this.props.history.push('/updatePhoto')
    }

    render () { 
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
        let photo =  _.map(this.props.profile, prof => {  return  prof.user_photo})       
                         
                 
        console.log("profile :" + JSON.stringify((this.props.profile)))
        console.log("profile name:" + name)
        /*
        const details =  _.map(this.props.profile, prof => {
     //   const details = this.props.profile.forEach(post => (
        return(
            <div  class="fieldBlock"> 
            <div class="title">{prof.user_name}</div>
            <div class="title">{prof.user_email}</div>
            <div class="title">{prof.user_phone}</div>
            <div class="title">{prof.user_about_me}</div>
            <div class="title">{prof.user_city}</div>
            <div class="title">{prof.user_country}</div>
            <div class="title">{prof.user_company}</div>
            <div class="title">{prof.user_hometown}</div>
            <div class="title">{prof.user_language}</div>
            <div class="title">{prof.user_gender}</div>
            <div className="pull-left image"> <img src={prof.user_photo} className="img-circle" alt="User Image" /> </div>
            </div>
        )
        });
        */
        
            //if not logged in go to login page
            let redirectVar = null;
     //       if(!cookie.load('cookie')){
      //          redirectVar = <Redirect to= "/signin"/>
       //     }
        return (
            
            <div>
            {redirectVar}
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                   
            <button   onClick={this.onSubmit} class="btn btn-primary" style={{"margin-left":"223px"}} type="submit">Update Profile</button>
            <button onClick={this.onSubmit1} class="btn btn-primary" style={{"margin-left":"363px","margin-top":"-54px"}} type="submit">Upload Photo</button>
            <div  className="container">
          
        {/*             <div class="fieldBlock">
                    <div class="title">Name</div>
                    <div class="title">Email </div>
                    <div class="title">Phone </div>
                    <div class="title">About Me </div>
                    <div class="title">City </div>
                    <div class="title">Country </div>
                    <div class="title">Company </div>
                    <div class="title">School </div>
                    <div class="title">Home Town </div>
                    <div class="title">Language </div>
                    <div class="title">Gender </div>
                  <div class="title">Photo </div> 
                </div>
                <div  class="fieldBlock"> 
                <div class="title">{name}</div>
                <div class="title">{email}</div>
                <div class="title">{phone}</div>
                <div class="title">{about_me}</div>
                <div class="title">{city}</div>
                <div class="title">{country}</div>
                <div class="title">{company}</div>
                <div class="title">{school}</div>
                <div class="title">{hometown}</div>
                <div class="title">{language}</div>
                <div class="title">{gender}</div>
               <div class="title">{photo}</div>   */}

        <table style={{"margin-left":"210px","padding":"5em","width":"500px"}}>
  <tr>
    <th>Name</th>
    <td>{name}</td>
  </tr>
  <tr>
    <th>Email</th>
    <td>{email}</td>
  </tr>
  <tr>
    <th>Phone</th>
    <td>{phone}</td>
  </tr>
  <tr>
  <th>About Me</th>
  <td>{about_me}</td>
</tr>
<tr>
<th>City</th>
<td>{city}</td>
</tr>
<tr>
<th>Country</th>
<td>{country}</td>
</tr>
<tr>
<th>Company</th>
<td>{company}</td>
</tr>
<tr>
<th>School</th>
<td>{school}</td>
</tr>
<tr>
<th>Hometown</th>
<td>{hometown}</td>
</tr>
<tr>
<th>Language</th>
<td>{language}</td>
</tr>
<tr>
<th>Gender</th>
<td>{gender}</td>
</tr>

</table>
            
            </div>
            </div>
                    </div>
                    </div>
                    </section>
                    </div>
            
            </div>
        )
        }
}
DispProfile.propTypes = {
    fetchProfile: PropTypes.func.isRequired,
    profile: PropTypes.array.isRequired
  
  };
  
  const mapStateToProps = state => (
      {
    profile: state.profile.items
  });
  

export default connect(mapStateToProps, { fetchProfile })(DispProfile);