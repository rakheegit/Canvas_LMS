import React, { Component } from 'react';
//import { updateProfile } from './myfunctions';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class UpdateProfile extends Component {
    constructor() {
        super()
        this.state = {
            user_name: '',
         //   user_email: '',
            user_phone: '',
            user_about_me: '',
            user_city: '',
            user_country: '',
            user_company: '',
            user_school: '',
            user_hometown: '',
            user_language: '',
            user_gender: '',
            user_photo: null
        }

        this.onChange = this.onChange.bind(this)
        this.onChange1 = this.onChange1.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
     
    }
    onChange1 (e) {
        this.setState({user_photo: e.target.files[0]});
    }

    onSubmit (e) {
    

        const formData = new FormData();
        formData.append('user_photo', this.state.user_photo);
    formData.append('user_name', this.state.user_name);
    formData.append('user_phone', this.state.user_phone);
    formData.append('user_about_me', this.state.user_about_me);
    formData.append('user_city', this.state.user_city);
    formData.append('user_country', this.state.user_country);
    formData.append('user_company', this.state.user_company);
    formData.append('user_hometown', this.state.user_hometown);
    formData.append('user_language', this.state.user_language);
    formData.append('user_gender', this.state.user_gender);
    
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    e.preventDefault()
    axios.post('http://localhost:3001/profileupdate',formData,config)
    .then((response) => {
        alert("The file is successfully uploaded");
        console.log("printing response" + JSON.stringify(response))
   
      this.props.history.push('/dispProfile')
  })
      .catch(err => {
          console.log(err)
      })
      }
          

    render () {
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
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Profile Update Form</h1>
                            <div className="form-group">
                                <label htmlFor="user_name">Student Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="user_name"
                                    placeholder="Enter Student Name"
                                    value={this.state.user_name}
                                    onChange={this.onChange}
                                />
                            </div>
                {/*            <div className="form-group">
                                <label htmlFor="user_email">Email</label>
                                <input  type="text"
                                    className="form-control"
                                    name="user_email"
                                    placeholder="Enter Email"
                                    value={this.state.user_email}
                                    onChange={this.onChange}
                                />
                            </div>
        */}
                            <div className="form-group">
                                <label htmlFor="user_phone">Phone</label>
                                <input type="text"
                                    className="form-control"
                                    name="user_phone"
                                    placeholder="Enter Phone"
                                    value={this.state.user_phone}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_about_me">About Me</label>
                                <input type="text"
                                    className="form-control"
                                    name="user_about_me"
                                    placeholder="Enter About Yourself"
                                    value={this.state.user_about_me}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="user_city">City</label>
                            <input type="text"
                                className="form-control"
                                name="user_city"
                                placeholder="Enter City"
                                value={this.state.user_city}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="user_country">Country</label>
                        <input type="text"
                            className="form-control"
                            name="user_country"
                            placeholder="Enter Country"
                            value={this.state.user_country}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="user_company">Company</label>
                    <input type="text"
                        className="form-control"
                        name="user_company"
                        placeholder="Enter Company Name"
                        value={this.state.user_company}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="user_school">School</label>
                <input type="text"
                    className="form-control"
                    name="user_school"
                    placeholder="Enter School Name"
                    value={this.state.user_school}
                    onChange={this.onChange}
                />
            </div>
                <div className="form-group">
                <label htmlFor="user_hometown">Hometown</label>
                <input type="text"
                    className="form-control"
                    name="user_hometown"
                    placeholder="Enter Hometown"
                    value={this.state.user_hometown}
                    onChange={this.onChange}
                />
            </div>
            <div className="form-group">
            <label htmlFor="user_language">Language</label>
            <input type="text"
                className="form-control"
                name="user_language"
                placeholder="Enter Language"
                value={this.state.user_language}
                onChange={this.onChange}
            />
        </div>
              <div className="form-group">
             <label htmlFor="user_gender">Gender</label>
             <input type="text"
                 className="form-control"
                name="user_gender"
                placeholder="Enter Gender"
                value={this.state.user_gender}
                onChange={this.onChange}
             />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_photo">Photo</label>
                           
                        </div>

                        <Button variant="contained"
                        label='My Label'>
                        <input type="file" name="common_name" onChange = {this.onChange1}/>
                      </Button>
                   
 <div style={{"padding":"10px"}}>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Submit Changes
                            </button></div>
                        </form>
                    </div>
                </div>
            </div>
            </section>
            </div>
        )
    }
}

export default UpdateProfile