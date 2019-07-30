import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class GradeEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {

      assns: [],
      user_grade:0,
      total_points: 0,
      student_answers: [],
      ischecked: false,
      assn_id:'',
      task_id:'',
      course_id:'',
      user_email:'',
      rescode:0,
      title:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount(){
    console.log("params " + JSON.stringify(this.props.match.params))
  //  const { quiz_id } = this.props.match.params
    const { assn_id } = this.props.match.params
  //  const { total_points } = this.props.match.params
    const { title } = this.props.match.params
    const { course_id } = this.props.match.params
    const { user_email} = this.props.match.params
    const { total_points} = this.props.match.params
 console.log("points: " + total_points + "email :" + user_email)

    this.setState({assn_id:  assn_id, course_id: course_id,user_email:user_email,
    title:title,total_points:total_points})
  }

  onSubmit(e){
  //  console.log("course_id2 :" + this.state.course_id )
  e.preventDefault()

    axios.post('/course/assngrade',{
     //   task_outof: this.state.assn.total_points,
        task_title:this.state.title,course_id:this.state.course_id,user_email:this.state.user_email,
        task_id: this.state.assn_id,task_grade:this.state.user_grade,task_outof:this.state.total_points
      
  })
  .then((response) => {
    console.log("grade entry response: " + JSON.stringify(response))

    if (response.status==201)
    this.setState({rescode: 201})
  })
  .catch(err => {
      console.log(err)
  })
  }

  render(){
let det =''
if(this.state.rescode==201)
det = <div>Grade Submitted!</div>
    
    return (
        <div className="content-wrapper">
        <section className="content-header">
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Grading Assignment</h1>
                       <div className="form-group">
                            <label htmlFor="user_grade">Grade Points</label>
                            <input  type="number"
                                className="form-control"
                                name="user_grade"
                                min="0" max="100"
                                value={this.state.user_grade}
                                onChange={this.onChange}
                            />
                        </div>
  
                        <button type="submit"
                            className="btn btn-lg btn-primary btn-block">
                           Done
                        </button>
                        {det}
                    </form>
                </div>
            </div>
        </div>
        </section>
        </div>
    )
  }

}

export default GradeEntry

