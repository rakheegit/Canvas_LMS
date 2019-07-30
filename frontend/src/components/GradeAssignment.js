import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class GradeAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {

      assns: [],
      position: 0,
      student_answers: [],
      ischecked: false,
      course_id:'',
      quiz_id: '',
      rescode:0
    }

  }

  componentDidMount(){
    console.log("params " + JSON.stringify(this.props.match.params))
  //  const { quiz_id } = this.props.match.params
    const { course_id } = this.props.match.params

    this.setState({course_id:  course_id})

    console.log("course_id2 :" + this.state.course_id )

    axios.get('/course/subassigns',{
        params:{course_id: course_id}
    })
    .then((response) => {
      console.log("submitted assignments: " + JSON.stringify(response))
 
    this.setState({
      assns :  (response.data).slice(0)
      
    });



    if(response){
      this.setState({
        rescode: 200
        
      });
    }
})
    .catch(err => {
        console.log(err)
    })
  }

  
  render(){


    let det =  this.state.assns.map(assn => {
     
         return(
      
          
           <tr>
      {/*      <td><button className="btn btn-link"  type='button' onClick={ this._onLinkClick} >{assn.title}</button> </td>*/}
      <td>{assn.user_email}</td>
      <td>{assn.title}</td>  
      <td>{assn.submitted_on}</td>
      {/*      <td> <Link to={`/dashboard/assigns/${this.state.targetId}/${assn._id}`} onClick={this._onLinkClick}>{assn.user_file}</Link></td>*/}
      <td><a href={'http://localhost:3001/'+`${assn.user_file}`} target="_blank">{assn.user_file}</a> </td>
      <td><Link to={`/dashboard/ViewSubmission/${assn.user_email}/${assn.assn_id}`} >View</Link></td>
      <td><Link to={`/dashboard/GradeEntry/${assn.course_id}/${assn.user_email}/${assn.total_points}/${assn.assn_id}/${assn.title}`} >Enter Grade</Link></td>
      <td>{assn.total_points}</td>
           </tr>
    
         )
     
     })
    
    return (
      <div>
      <div  style={{"margin-left":"20px","display":"flex"}} class="content-wrapper">
      <section className="content-header">
      <div className="container">
      <div className="row">
      <div className="col-md-6 mt-5 mx-auto">
      <div class="container">
      <table  style={{"margin-left":"250px"}}>
          <thead>
              <tr>
                  <th>Student Id</th>
                  <th>Assignment Title</th>
                  <th>Submitted On</th>
                  <th>Download Submission</th>
                  <th>View Submission</th>
                  <th>Grading</th>
                  <th>Total Points</th>
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
    )
  }

}

export default GradeAssignment

