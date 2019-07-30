// MyApp.js
import React, { Component } from 'react';
//import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import axios from 'axios';

const file ='http://localhost:3001/profile_uploads/2019-04-16T00:52:14.228ZeStmt_2019-02-08.pdf'
const type = 'pdf'

class ViewSub extends Component {
    constructor(props) {
        super(props);
        this.state = {
      //    assn_id:'',
      //   user_email:'',
         assn_rec:[],
         rescode:0
        }
    
      }
    
      componentDidMount(){
        console.log("params " + JSON.stringify(this.props.match.params))
    
        const { user_email,assn_id } = this.props.match.params
      /*
        this.setState({
          assn_id : assn_id,user_email: user_email
      });
      console.log("assn id: " + JSON.stringify(this.state.ass_id))
      console.log("user email: " + JSON.stringify(this.state.user_email))
    */
    
    console.log("assn id: " + assn_id)
      console.log("user email: " + user_email)
        axios.get('http://localhost:3001/users/path'
             ,{
                 params:{assn_id: assn_id,user_email:user_email}}
             )
             .then((response) => {
                 console.log("response: " + JSON.stringify(response.data))
         
             //update the state with the response data
          
             this.setState({
                 assn_rec : response.data
         
             });
    
      if(response){
        this.setState({
          rescode: 200
          
        });
      }
      console.log("path " + JSON.stringify(this.state.assn_rec.user_file))
      console.log("path1" + this.state.assn_rec.user_file)
    })
      .catch(err => {
          console.log(err)
      })
      }
  render() {
  
    console.log("filename1 " +this.state.assn_rec.user_file)
    console.log("filename2 " + JSON.stringify(this.state.assn_rec.user_file))
    var file = ''
   // file = 'http://localhost:3001/'+`${this.state.assn_rec.user_file}`
   file = this.state.assn_rec.user_file
    console.log("filename a " + file)
    let newfile =''
    newfile = file
    console.log("filename b " + newfile)
    return (
      <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
    );
  }


}
export default ViewSub;