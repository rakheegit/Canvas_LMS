import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';

//var socket = io()

class Inbox extends Component {
    constructor() {
        super()
        this.state  = {
            search_type: '',
            message_text: '',
            to_email:'',
            subject: '',
            course_filter: 0,
            rescode: 0,
            messages: [],
            showComponenthome : false
          
          };

        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeRadio = this.onChangeRadio.bind(this)
       this._onLinkClick = this._onLinkClick.bind(this);
    }

    _onLinkClick(e) {
       
        console.log("clicked subject link")
        this.setState({
          showComponenthome: false,
        //  hideAllComponent:true
        });
    
        console.log("state.showcomponentPpl1" +  this.state.showComponentPpl)
    }

    onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeRadio (e) {
        this.setState({  search_type : e.target.value })
    }

    componentDidMount () {
      
//        socket.on('message', msg => console.log("messages from socket: " + msg))
        const token = localStorage.getItem('usertoken');
        axios.get('/users/message_list',
            {headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}}
        )
        .then((response) => {
             console.log("response subject messages" + JSON.stringify(response))
        //update the state with the response data
     
        this.setState({
            messages : response.data
        });

        if(response.status===200){
            this.setState({
                showComponenthome : true
            });
        }

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
        
    let details = [];

    if(this.state.showComponenthome)
    {
              let   det =  this.state.messages.map(msgs => {
                
                    return(
                      <tr>
                      <td>{msgs.fromemail}</td>
                       <td>{msgs.toemail}</td>
                      <td><Link  to={`/_inbox/messages/${msgs.subject}`}  onClick={this._onLinkClick}>{msgs.subject} </Link></td>
                      </tr>
                    )
                
                })

                details = 
              
           <div>
           <div class="content-wrapper">
           {redirectVar}
           <section className="content-header">
           <div className="container">
               <div className="row">
                   <div className="col-md-6 mt-5 mx-auto">
                     
            <div class="container">
            <Link to="/newMessage" ><i className="fa fa-edit"></i> New Message</Link>
                    <h3>Message List</h3>
                        <table  style={{"top":"100px","left":"20px"}} class="table">
                            <thead>
                                <tr>
                                <th> From </th>
                                <th> To </th>
                                    <th> Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {det}
                            </tbody>
                        </table>
                </div> 
                </div>
                </div>
                </div>
                </section>
                </div>
            </div>    
    }

    return(  
        <div>
        {redirectVar}
        {details}
        </div>
        )
}
}

export default Inbox