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
            user_photo: null
        }

      //  this.onChange = this.onChange.bind(this)
        this.onChange1 = this.onChange1.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

 
    onChange1 (e) {
        this.setState({user_photo: e.target.files[0]});
    }

    onSubmit (e) {
    

        const formData = new FormData();
        formData.append('user_photo', this.state.user_photo);
    
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    e.preventDefault()
    axios.post('/users/photoupdate',formData,config)
    .then((response) => {
        alert("The photo is successfully uploaded");
        console.log("printing response" + JSON.stringify(response))
   
      this.props.history.push('/')
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
                            <h1 className="h3 mb-3 font-weight-normal">Upload/Change Photo</h1>
                     
                        <div className="form-group">
                            <label htmlFor="user_photo">Upload Photo here</label>
                           
                        </div>

                        <Button variant="contained"
                        label='My Label'>
                        <input type="file" name="common_name" onChange = {this.onChange1}/>
                      </Button>
                   
 <div style={{"padding":"10px"}}>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Submit
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