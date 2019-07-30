import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import DrawerToggle from './SideMenu/DrawerToggle';
import axios from 'axios';

export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logoutFlag : false,
            user_data: []
        }
        this.handleSignout = this.handleSignout.bind(this);
    }
    
 
    componentWillMount() {
        //call to action
       // this.props.fetchProfile();
       //this.props.history.push('/get_profilepic')

       let accessToken = localStorage.getItem('usertoken')
       console.log("accessToken: " + accessToken)
   axios.get('/users/profilepic',{headers:{Authorization: `Bearer ${accessToken}`}})
   .then((response) => {
     //  alert("The file is successfully uploaded");
       console.log("printing response" + JSON.stringify(response.data))
       this.setState({
        user_data : this.state.user_data.concat(response.data),
    });
    console.log("userdata:" + JSON.stringify(this.state.user_data))
 })
     .catch(err => {
         console.log(err)
     })
      }
      

    static propTypes = {
        onDrawerToggleClick: PropTypes.func.isRequired,
      }
       //handle logout to destroy the cookie
       handleSignout = () => {
        cookie.remove('cookie', { path: '/' })
    
        this.setState({
            logoutFlag : true
        })
    }

    handleDispProfile = () => {
            console.log("this.props.history: " + JSON.stringify(this.props.history))
            this.props.history.push('/disp_profile')
    }

    render(){
        let pic =  this.state.user_data.map(data => {
       return  data.user_photo
        })
        let name =  this.state.user_data.map(data => {
            return  data.user_name
             })
             let type = ""
               this.state.user_data.map(data => {
                type = data.user_type
                 })
      
                 console.log("type: " + type)
                 let print_type = ''      
                 let menu_type = '' 
                 let icon = '' 
if (type == "student"){
    console.log("type2: " + type)
 print_type = <li className="header">Student</li> }
 else if (type == "faculty")
 print_type = <li className="header"> Faculty</li>

 
 if (type == "faculty"){
    console.log("type2: " + type)
 menu_type =  "Faculty Actions";
 icon = "fa fa-book"
 }

 
            let redirectVar = null;
            //     {console.log("hiiii " + this.state.authFlag)}
                 if(this.state.logoutFlag===true){
                     redirectVar = <Redirect to= "/signin"/>
                 }
                 const { onDrawerToggleClick } = this.props;

                 let details =    ''
                 if    (type == "student")
                 { details =
                  <React.Fragment>
                     <li className="treeview active">
                     <a href="#">
                         <i className="fa fa-address-card"></i>
                         <span>Enrollment</span>
                         <span className="pull-right-container">
                         <i className="fa fa-angle-left pull-right"></i>
                         </span>
                     </a>
                     <ul className="treeview-menu">
                        
                     <MenuItem label='Search' link='/search' />
                     <MenuItem label='Enroll' link='/enrollCourse' />
                     <MenuItem label='Drop' link='/dropCourse' />
                     </ul>
                     </li>
                     </React.Fragment>
                 }
                 
        return (
            <aside className="main-sidebar">
                <section className="sidebar"  style={{"height":"200px"}} >
                    <div className="user-panel">
                        <div className="pull-left image">
                          <img src={pic} className="img-circle" alt="User Image" /> 
                        </div>
                        <div className="pull-left info">
                            <p> <Link to="/dispProfile"> {name}</Link></p> 
                            
                      {/*}      <a href="#"><i className="fa fa-circle text-success"></i> Online</a>*/}
                        </div>
                    </div>
                   
                    <ul className="sidebar-menu tree" data-widget="tree">
                    {print_type}
                                             
                        <li className="treeview active">
                            <a href="#">
                                <i className="fa fas fa-user-circle"></i>
                                <span>Account</span>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/dispProfile" ><i className="fa fa-circle-o"></i> Profile</Link></li>
                                <li><Link to="/signin" onClick = {this.handleSignout}><i className="fa fa-circle-o"></i> Logout</Link></li>
                              
                            </ul>
                        </li>

                        <MenuItem label='Dashboard' link='/dashboard' icon='fa fa-dashboard' />
                        <MenuItem label='Inbox' link='/inbox' icon='fa fa-inbox'  /> 
                    
                {details}
                        <MenuItem label={menu_type} link='/tempMenu' icon={icon} onDrawerToggleClick={ onDrawerToggleClick } />
                       
                    </ul>
                   
                </section>
            </aside> 
        )
    }
}