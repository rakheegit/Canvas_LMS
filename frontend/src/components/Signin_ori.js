import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import "../App.css";

function validate(user_email, user_password) {
    // true means invalid, so our conditions got reversed
    return {
      user_email: user_email.length === 0,
      user_password: user_password.length === 0
    };
  }

class Signin extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        //maintain the state required for this component
        this.state = {
            user_email : "",
            user_password : "",
           authFlag : false,
           touched: {
            user_email: false,
            user_password: false
          }
        }
        //Bind the handlers to this class
        this.onChangeHandler = this.onChangeHandler.bind(this);
      //  this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.signin = this.signin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }
    
      handleBlur = field => evt => {
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });
      };
    componentWillMount(){
        this.setState({
            authFlag : false,
            user_type: cookie.load('cookie')
           
        })
    }

    onChangeHandler (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
  //  handleSubmit = e => {
   //     if (!this.canBeSubmitted()) {
    //      e.preventDefault();
    //      return;
    //    }
    //    const { user_email, user_password } = this.state;
    //    alert(`Signed up with email: ${user_email} password: ${user_password}`);
    //  };
    
      canBeSubmitted() {
        const errors = validate(this.state.user_email, this.state.user_password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

      onSignup(){
        this.props.history.push('/signup')
      }

    signin = (e) => {
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
          }
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
    
        const data = {
            user_email : this.state.user_email,
            user_password : this.state.user_password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signin',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("showing 200!");
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }
    render(){

        const errors = validate(this.state.user_email, this.state.user_password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
    
        const shouldMarkError = field => {
          const hasError = errors[field];
          const shouldShow = this.state.touched[field];
    
          return hasError ? shouldShow : false;
        };

        // based on successful login
        let redirectVar = null;
        console.log("authfalg " + this.state.authFlag) 
        if(this.state.authFlag==true){
          //  redirectVar = <Redirect to= "/"/>
          this.props.history.push('/')
        }
        return(
            <div>
            {redirectVar}
    
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
            <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.signin}>

                        <div class="panel">
                            <h2>Login</h2>
                            <p>Enter Email and Password</p>
                        </div>
                        
                            <div class="form-group">
                            
                                <input className={shouldMarkError("user_email") ? "error" : ""}
                                type="text"  name="user_email" placeholder="Email"  value={this.state.user_email}
                                onChange={this.onChangeHandler}
                                onBlur={this.handleBlur("user_email")}/>
                                
                            </div>
                            <div class="form-group">
                                <input className={shouldMarkError("user_password") ? "error" : ""}
                                type="password"  name="user_password" placeholder="Password" value={this.state.user_password}
                                onChange={this.onChangeHandler}
                                onBlur={this.handleBlur("user_password")}/>
                            </div>
                            <button id="btn_space" disabled={isDisabled} type="submit" onClick = {this.signin} class="btn btn-primary">Sign In</button> 
                            <button type="submit" onClick = {this.onSignup} class="btn btn-primary">Sign Up </button>  
                  
                                              
                  
               
                </form>
                </div>
                </div>
                <div class="container">
                </div>
               </div>
            </section>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Signin;