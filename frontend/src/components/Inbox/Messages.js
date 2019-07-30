import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import io from 'socket.io-client'

//var socket = io()

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state  = {
            search_type: '',
            message_text: '',
            to_email:'',
            subject: '',
            course_filter: 0,
            rescode: 0,
            messages: [],
            get_subject:''
          };

        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeRadio = this.onChangeRadio.bind(this)
       this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeRadio (e) {
        this.setState({  search_type : e.target.value })
    }

    componentDidMount () {
        console.log("this.props" + JSON.stringify(this.props))
        const { subjectmsg } = this.props.match.params
        console.log("msg_subject: " + subjectmsg)

        this.setState({
          get_subject: subjectmsg
        })
      
//        socket.on('message', msg => console.log("messages from socket: " + msg))
    //    const token = localStorage.getItem('usertoken');
       
        axios.get('/users/getbysubject'
          ,{
            params:{subject:subjectmsg}
           } 
           )
           .then((response) => {
               console.log("response got: " + JSON.stringify(response.data))
        
           this.setState({
               messages : this.state.messages.concat(response.data)
            //  messages : response.data
           });
       })
           .catch(err => {
               console.log(err)
           })
}
    onSubmit (e) {
        e.preventDefault()

        console.log("search type: " + this.state.to_email + this.state.message_text )
    axios.post('/users/messages',
       {to_email: this.state.to_email, subject: this.state.get_subject, message: this.state.message_text}
    )
    .then((response) => {
        if(response.status === 201){

             console.log("Response code 201!");
         
             this.setState({
                rescode : 201
                 })
                 /*
                 axios.get(`/users/messages/${this.state.to_email}`
                  ,{
                        params:{to_email: this.state.to_email}
                    } 
                    )
                    .then((response) => {
                        console.log("response got: " + JSON.stringify(response.data))
                 
                    this.setState({
                       // messages : this.state.messages.concat(response.data)
                       messages : response.data
                    });
                })
                    .catch(err => {
                        console.log(err)
                    })
                    */
                }
            }
                 )

     //        this.setState({
     //        messages : response.data
     //   });
       
    .catch(err => {
        console.log(err)
    })
}


render () {
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
let msg=''
        if(this.state.rescode === 201){
             msg = <div>Reply Sent!</div>
        }

    let details = [];
        details = this.state.messages.map(msg => {
            return(
                <div style={{"margin-left":"70px"}}>
                <h3>{msg.subject}</h3>
             
                <div style={{"padding":"4px", "font-weight":"bold"}}>FROM: {msg.user_email}</div>
                <div style={{"padding":"4px"}}> TO: {msg.to_email}</div>
             <div style={{"padding":"4px"}}>   MESSAGE:</div>
                   <div style={{"padding":"7px"}}>{msg.message}</div>
                   <div style={{"border-top":"4px solid #3c8dbc"}}></div>
                </div>
                )
                })
             
        return (
           <div>
           <div class="content-wrapper">
           {redirectVar}
           <section className="content-header">
           <div className="container">
               <div className="row">
                   <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                 
                            <h1 className="h4 mb-3 font-weight-normal">Reply on this Subject</h1>

                        <div className="form-group">
                        <label htmlFor="to_email">Send To</label>
                        <input type="text"
                            className="form-control"
                            name="to_email"
                            placeholder="Enter Receiver's Canvas Id"
                            value={this.state.to_email}
                            onChange={this.onChangeText}
                        />
                    </div>
           
                    <div className="form-group">
                    <label htmlFor="message_text">Message   </label>
                    <textarea  name="message_text" placeholder="Enter Text"
                    className="form-control"
                    value={this.state.message_text} 
                    onChange={this.onChangeText}/> 
                </div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Send
                            </button>
                          {msg}
                           
                        </form>
            <div class="container">                
                   {details}         
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
    

export default Messages