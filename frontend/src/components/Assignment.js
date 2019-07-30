import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Assignment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetId: null,
      user: null,
      user_file:null,
      download:null,
      course_id:'',
      assn: {},
      assn_id: '',
      rescode:0,
      assn_rec:[]
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange (e) {
    this.setState({user_file: e.target.files[0]});
}
    componentDidMount () {
    console.log("params " + JSON.stringify(this.props.match.params))
    const { assn_id } = this.props.match.params
    const { course_id } = this.props.match.params

    this.setState({course_id:  course_id, assn_id: assn_id})

    console.log("course_id in assn:" + this.state.course_id + this.state.assn_id )

    axios.get(`/course/assn/${assn_id}`)
    .then((result) => {
      //  this.setState({  assn :  (result.data).slice(0)})
      this.setState({assn: result.data});
    //  this.setState({user :  this.state.user.concat(user.data)})
      console.log("result " + JSON.stringify(result.data))
     console.log("user obj " + this.state.assn)
     console.log("user obj1 " + JSON.stringify(this.state.assn))
   //   console.log("quiz obj " + JSON.stringify(this.state.quizz.quiz_items))
  //   let q_items1 = JSON.stringify(this.state.quizz.quiz_items)
  //   this.setState({q_items :  user.data.quiz_items[0]})
  //   console.log("q_items question" + this.state.q_items.question)
  //   console.log("q_items question " + q_items1[0].question)
  console.log("quiz obj title " + JSON.stringify(this.state.assn.title))
  console.log("quiz obj title1" + this.state.assn.title)
  console.log("quiz obj content" + JSON.stringify(this.state.assn.content))
  console.log("quiz obj content1" + this.state.assn.content)

})
    }
   

    onSubmit(e){
     
        const formData = new FormData();
        formData.append('user_file', this.state.user_file);
        formData.append('course_id', this.state.course_id);
        formData.append('title', this.state.assn.title);
        formData.append('assn_id', this.state.assn_id);
        formData.append('total_points', this.state.assn.total_points);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    e.preventDefault()
    axios.post('/users/file',formData,config)
    .then((response) => {
        alert("file is successfully uploaded");
        console.log("printing response" + JSON.stringify(response))
        if(response.status === 201){
            console.log("resp 201")
            this.setState({
                rescode: 201
            })
        }
    })
            
      .catch(err => {
          console.log(err)
      })
      }
          

      onClick (e) {
      

        axios.get('/users/path'
         ,{
             params:{assn_id: this.state.assn_id}}
         )
         .then((response) => {
             console.log("response: " + JSON.stringify(response.data))
     
         //update the state with the response data
      
         this.setState({
             assn_rec : response.data
     
         });

         if(response){
            this.setState({
                rescode : 1
        
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

        console.log("this.state.rescode: " + this.state.rescode)
        let det = ''; let det1=''; let det2 =''
        if(this.state.rescode === 201)
       det = <div>File uploaded</div>

       if(this.state.rescode === 1)
   
   det1 = <div><div style={{"margin-left":"3em"}}><a href={this.state.assn_rec.user_file} target="_blank">Download</a></div>
    <div style={{"margin-left":"3em"}}><Link to={`/dashboard/ViewSubmission/${this.state.assn_rec.user_email}/${this.state.assn_rec.assn_id}`} >View</Link></div>
    </div>
    
        return(
           
          <div class="content-wrapper">
          <section className="content-header">
          <div className="container">
              <div className="row">
                  <div className="col-md-6 mt-5 mx-auto">
    
     <h3 style={{"padding":"7px"}}>{this.state.assn.title}</h3>
   
     <div style={{"border-top":"2px solid #3c8dbc"}}></div>
     <div style={{"padding":"10px"}} class="container">
     <div class="left" >Due date: {" " }{this.state.assn.due_date}</div>
    <div class="right">Total Points: {" " }{this.state.assn.total_points}</div>
    </div>

     <div style={{"border-top":"2px solid #3c8dbc"}}></div>
<div  style={{"padding":"10px"}}>Description: {" " }{this.state.assn.content}</div>

     <div style={{"border-top":"2px solid #3c8dbc"}}></div>
     <div style={{"padding":"10px"}}>Submission: {" " }
     <form style={{"margin-left":"50px"}} onSubmit={this.onSubmit}>
     <Button variant="contained"
     label='My Label'>
     <input type="file" name="common_name" onChange = {this.onChange}/>
   </Button>

  <div style={{"padding":"10px"}}> <button type="submit"  class="btn btn-primary">Submit Assignment</button>  </div>
  {det}
  </form>
 
  </div>

  <div style={{"padding":"10px"}}>
 {/* <a href={`http://localhost:3001/uploads/'+'${this.state.user_file}`} target="_blank">View Submission</a> */}
 
   <button type="submit"  onClick={this.onClick}  class="btn btn-primary">View Submission</button>  </div>
{det1} 
</div>
</div>
</div>
</section>
</div>
        )
    }
  }
  export default Assignment