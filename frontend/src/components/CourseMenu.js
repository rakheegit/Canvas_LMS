import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { crtAnc } from './myfunctions';
import { crtAsn } from './myfunctions';
import { crtQuiz } from './myfunctions';
import "../App.css";
import "./style.css";

import './SideMenu/SideMenu.css';

class CourseMenu extends Component{
  constructor(props) {
    super(props)
    this.state = {
        user_type:'',
        currentPage: 1,
        itemsPerPage: 10,
      targetId: null,
      course:[],
      showComponentPpl: false,
      showComponentGrd: false,
      showComponentAnc: false,
      showComponentAsn: false,
      showComponentLec: false,
      showComponentViewAsn: false,
      showComponentFac:false,
      people:[],
      announces:[],
      assns:[],
      quizzes:[],
      grades:[],
      gradesum:[],
      lects:[],
      assigns:'',
      user_file:null,
      create_type:'',
      showComponentCrtAnc: false,
      showComponentCrtQuiz: false,
      showComponentRmvStd: false,
      title:'',
      content:'',
      due_date:'',
      total_points:0,
      optA: '',
      optB:'',
      optC:'',
      optD:'',
      answer:'',
      hideAllComponent:false,
      user_email:'',
      msgflag:false
    }
    this._onButtonClickPpl = this._onButtonClickPpl.bind(this);
    this._onButtonClickAnc = this._onButtonClickAnc.bind(this);
    this._onButtonClickQz = this._onButtonClickQz.bind(this);
    this._onButtonClickGrd = this._onButtonClickGrd.bind(this);
   this._onButtonClickAsn = this._onButtonClickAsn.bind(this);
   this._onButtonFaculty = this._onButtonFaculty.bind(this);
   this._onButtonClickLec = this._onButtonClickLec.bind(this);
   this.onSubmitCreate = this.onSubmitCreate.bind(this);
 //  this.onChange = this.onChange.bind(this);
   this.onChangeText = this.onChangeText.bind(this);
   this.onChangeRadio = this.onChangeRadio.bind(this);
   this.onChangeFile = this.onChangeFile.bind(this);
   this.onSubmitCrtAnc = this.onSubmitCrtAnc.bind(this);
   this.onSubmitCrtAsn = this.onSubmitCrtAsn.bind(this);
   this.onSubmitCrtLec = this.onSubmitCrtLec.bind(this);
   this.onSubmitCrtQuiz = this.onSubmitCrtQuiz.bind(this);
   this.onSubmitRmvStd = this.onSubmitRmvStd.bind(this);
   this.handleClick = this.handleClick.bind(this);
   //this.onAddQuestion = this.onAddQuestion.bind(this);
  }
  onChangeText(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
 

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  _onButtonClickPpl(e) {
    this.setState({
      showComponentPpl: true,
      showComponentGrd: false,
      showComponentAnc:false,
      showComponentAsn:false,
      showComponentLec:false,
      showComponentViewAsn:false,
      showComponentFac:false,
      showComponentQz: false
    });
    console.log("state.showcomponentPpl1" +  this.state.showComponentPpl)
console.log("targetId for getting people: " + this.state.targetId)
    e.preventDefault()

    axios.get('/course/people',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("printing people response" + JSON.stringify(response))
 
    this.setState({
      //  people :  this.state.people.concat(response.data) 
        people :  (response.data).slice(0)
      
    });
})
    .catch(err => {
        console.log(err)
    })
    
  }
  onChangeRadio (e) {
    this.setState({  create_type : e.target.value })
}
onChangeFile (e) {
    this.setState({user_file: e.target.files[0]});
}

  onSubmitCreate (e) {
    e.preventDefault()
  if(this.state.create_type === "Announcement") {
    this.setState({
      showComponentCrtAnc: true
    })
}
if(this.state.create_type === "Assignment") {
    this.setState({
      showComponentCrtAsn: true
    })
}
if(this.state.create_type === "Lecture") {
    this.setState({
      showComponentCrtLec: true
    })
}
    if(this.state.create_type === "Quiz") {
        this.setState({
          showComponentCrtQuiz: true
        })
    /*    this.props.history.push({
           pathname: '/AddQuestion',
         //  search: '?query=abc',
           state: { course_id: this.state.targetId }
        }) */

  }
  if(this.state.create_type === "Remove Student") {
    this.setState({
      showComponentRmvStd: true
    })
console.log("The create assignment page")

}
}
onSubmitCrtAnc (e) {
  e.preventDefault()
  const anc = {
    course_id: this.state.targetId,
    title: this.state.title,
    content: this.state.content
}
crtAnc(anc).then(res => {
  console.log("this.props.history: " + JSON.stringify(this.props.history))
})
}

onSubmitCrtAsn (e) {
    e.preventDefault()

axios.post('/course/assignment', {
       course_id: this.state.targetId,
      title: this.state.title,
      content: this.state.content,
        due_date: this.state.due_date,
        total_points: this.state.total_points
            })
            .then((data) => {
                console.log(data)
            if(data.status===201)
            {
                this.setState({
                    rescode: 1
                })
    
            }
        })
            .catch(err => console.log(err))

    console.log("this.props.history: " + JSON.stringify(this.props.history))
  }

  onSubmitCrtLec (e) {
 
    const formData = new FormData();
        formData.append('user_file', this.state.user_file);
        formData.append('course_id', this.state.targetId);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    e.preventDefault()
    axios.post('/users/lectures',formData,config)
    .then((response) => {
        alert("lecture file is successfully uploaded");
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

onSubmitCrtQuiz (e) {
    e.preventDefault()
    const qz = {
      course_id: this.state.targetId,
      title: this.state.title,
      question: this.state.content,
      optionA: this.state.optA,
      optionB: this.state.optB,
      optionC: this.state.optC,
      optionD: this.state.optD,
      answer: this.state.answer,
      due_date: this.state.due_date
  }
  crtQuiz(qz).then(res => {
    console.log("this.props.history: " + JSON.stringify(this.props.history))
  })
  }
  onSubmitRmvStd (e) {
    e.preventDefault()
    const user = {
      user_email: this.state.user_email,
      course_id: this.state.targetId
  }
  axios.post('/users/removestudent', {
    course_id: user.course_id,
    user_email: user.user_email
})
.then(response => {
    console.log("response: " + JSON.stringify(response.data))
    console.log("response status: " + JSON.stringify(response.status))

    if(response.status === 200){
console.log("Response code 200!");

this.setState({
    msgflag : true
})
}
})
  }

  _onButtonClickAsn(e) {
    this.setState({
      showComponentAnc:false,
      showComponentPpl:false,
      showComponentAsn:true,
      showComponentFac:false,
      showComponentQz: false,
      showComponentGrd: false,        
    });
    console.log("state.showcomponentAsn1" +  this.state.showComponentAsn)
console.log("targetId for getting Assigns: " + this.state.targetId)

    e.preventDefault()

    axios.get('/course/assignments',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("printing announces response" + JSON.stringify(response))
 
    this.setState({
      assns :  (response.data).slice(0)
      
    });
})
    .catch(err => {
        console.log(err)
    })
  }


  _onButtonClickLec(e) {
    this.setState({
      showComponentAnc:false,
      showComponentPpl:false,
      showComponentAsn:false,
      showComponentLec:true,
      showComponentFac:false,
      showComponentQz: false,
      showComponentGrd: false,        
    });
    console.log("state.showcomponentLec1" +  this.state.showComponentAsn)
console.log("targetId for getting Lectures: " + this.state.targetId)

    e.preventDefault()

    axios.get('/course/lectures',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("lectures response" + JSON.stringify(response))
 
    this.setState({
      lects :  (response.data).slice(0)
      
    });
})
    .catch(err => {
        console.log(err)
    })
  }

  _onButtonClickQz(e) {
    this.setState({
        showComponentQz: true,
        showComponentGrd: false,
      showComponentAnc: false,
      showComponentPpl:false,
      showComponentAsn:false,
      showComponentLec:false,
      showComponentViewAsn:false,
      showComponentFac:false
    });
    console.log("state.showcomponentQz1" +  this.state.showComponentQz)
console.log("targetId for getting quizzes: " + this.state.targetId)
    e.preventDefault()

    axios.get('/course/quiz',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("Quiz response" + JSON.stringify(response.data))
 var quiz_id = response.data._id
 console.log("Quiz ID " + quiz_id)

    this.setState({
      quizzes :  (response.data).slice(0)
      
    });
})
    .catch(err => {
        console.log(err)
    })
  }

  _onButtonClickGrd(e) {
    this.setState({
    showComponentQz: false,
    showComponentGrd: true,
    showComponentAnc: false,
    showComponentPpl:false,
    showComponentAsn:false,
    showComponentLec:false,
    showComponentViewAsn:false,
    showComponentFac:false
    });
    console.log("state.showcomponentGrd1" +  this.state.showComponentGrd)
console.log("targetId for getting grades: " + this.state.targetId)
    e.preventDefault()

    axios.get('/course/grades',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("Grades response" + JSON.stringify(response.data))
 var task_id = response.data.task_id
 console.log("Task item ID " + task_id)

    this.setState({
      grades :  (response.data).slice(0)
      
    });

    axios.get('/course/gradesum',{
        params:{course_id: this.state.targetId}
    })
    .then((resp) => {
        console.log("Grade SUM response" + resp.data)
      console.log("Grade SUM response11" + JSON.stringify(resp.data))
 //var grade_sum = resp.data[0].sum_grade
 //var outof_sum = resp.data[0].sum_outof
 //console.log("Sum Grade + outof " + grade_sum + " " + outof_sum)

    this.setState({
  //    gradesum :  (resp.data).slice(0)
  gradesum :  (resp.data).slice(0)
    })

    }).catch(err => {
        console.log(err)
    })
    
})
    .catch(err => {
        console.log(err)
    })
  }

    _onButtonClickAnc(e) {
      this.setState({
        showComponentAnc: true,
        showComponentGrd: false,
        showComponentPpl:false,
        showComponentAsn:false,
        showComponentLec:false,
        showComponentViewAsn:false,
        showComponentFac:false
      });
      console.log("state.showcomponentAnc1" +  this.state.showComponentAnc)
console.log("targetId for getting announces: " + this.state.targetId)
      e.preventDefault()

      axios.get('/course/announcements',{
          params:{course_id: this.state.targetId}
      })
      .then((response) => {
        console.log("printing announces response" + JSON.stringify(response))
   
      this.setState({
        announces :  (response.data).slice(0)
        
      });
  })
      .catch(err => {
          console.log(err)
      })
    }


  _onButtonFaculty(){
    this.setState({
      showComponentAnc:false,
      showComponentGrd: false,
      showComponentPpl:false,
      showComponentAsn:false,
      showComponentLec:false,
      showComponentViewAsn:false,
      showComponentFac:true
    });
    console.log("state.showcomponentAsn1" +  this.state.showComponentFac)
console.log("targetId for getting Assigns: " + this.state.targetId)
   
  }
    componentDidMount(){
        var c_id = this.props.targetId;
     //   var c_name = this.props.targetName;
        console.log("this.props.targetId1: " + this.props.targetId )
        console.log("c_id1: " + c_id)
        console.log("this.props" + JSON.stringify(this.props))
        const { courseid } = this.props.match.params
        const { user_type } = this.props.match.params
        console.log("in courseid: " + courseid + user_type)
        console.log("in coursemenu: "  + JSON.stringify(this.props.match.params ))
        this.setState({
          targetId: courseid,user_type:user_type
        })

        axios.get('/course/courseget', {params:{course_id: courseid}})
        .then((course) => {
          this.setState({course : course.data })
          console.log("course.data " + JSON.stringify(course.data))
        })
        .catch(err=>{
        if(err) console.log(err) 
        })
    }
    render() {
        const { people, currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
     //   const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
     const currentTodos = people.slice(indexOfFirstTodo, indexOfLastTodo);
//     console.log("currentTodos: " + JSON.stringify(currentTodos))

  //      const renderTodos = currentTodos.map((todo, index) => {
  //        return <li  key={index}>{todo}</li>;
   //     });

        let  renderTodos =  currentTodos.map((person,index) => {
 
            return(
              <tr key={index}>
              <td>{person.user_name}</td>
              <td>{person.user_email}</td>
              <td>{person.user_type}</td>
              </tr>
            )
        
        })
  
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(people.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }
  
        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });


  //  const { name } = props;
 // const { opened } = props;
  const cssClasses = 'side-menu-fixed open';
  console.log("this.props.targetId: " + this.props.targetId )

  var c_id = this.props.targetId;
  console.log("c_id: " + c_id)

  let mesg =''
  if(this.state.msgflag==true)
    mesg = 
      <div > Student Removed from course successfully </div>
  

  let details = null;
  if(this.state.showComponentFac){
    details = 
      <div >
      <form style={{"width":"300px","margin-left":"50px"}} noValidate onSubmit={this.onSubmitCreate}>
                            <h1 className="h4 mb-3 font-weight-normal">Select Action</h1>
                          
                            <div className="form-group">
                                <label>
                                <input type="radio"
                                    name="create_type" 
                                    value="Announcement"
                                    onChange={this.onChangeRadio}
                                    checked={this.state.create_type === "Announcement"}
                                />{" "}
                               Make Announcement
                                </label>{" "}
                            </div>
                            <div className="form-group">
                                <label>
                                <input type="radio"
                                    name="create_type"
                                    value="Assignment"
                                    onChange={this.onChangeRadio}
                                    checked={this.state.create_type === "Assignment"}
                                />{" "}
                              Create Assignment
                                </label>{" "}
                            </div>
                            <div className="form-group">
                            <label>
                            <input type="radio"
                                name="create_type"
                                value="Lecture"
                                onChange={this.onChangeRadio}
                                checked={this.state.create_type === "Lecture"}
                            />{" "}
                            Publish Lecture Notes/Files
                            </label>{" "}
                        </div>
                        <div className="form-group">
                        <label>
                        <input type="radio"
                            name="create_type"
                            value="Remove Student"
                            onChange={this.onChangeRadio}
                            checked={this.state.create_type === "Remove Student"}
                        />{" "}
                        Remove Student
                        </label>{" "}
                    </div>
                {/*        <div className="form-group">
                        <label>
                        <input type="radio"
                            name="create_type"
                            value="Quiz"
                            onChange={this.onChangeRadio}
                            checked={this.state.create_type === "Quiz"}
                        />{" "}
                        Create Quiz
                        </label>{" "}
  </div>  */}
  <div className="form-group">
  <Link to={`/dashboard/AddQuestion/${this.state.targetId}` } onClick={this._onLinkClick}>Create Quiz</Link>
  </div>
  <div className="form-group">
  <Link to={`/dashboard/Grade/${this.state.targetId}` } onClick={this._onLinkClick}>Grade Assignments</Link>
  </div>
                  

                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Submit
                            </button>
                            <br/>
                        </form>
</div> 
  }
  let msg =''
  if(this.state.rescode===1)
    msg = <div >Assignment Published!</div>

  if(this.state.showComponentCrtAsn){
    details = 
      <div >
      <form  style={{"margin-left": "50px","width": "700px"}}noValidate onSubmit={this.onSubmitCrtAsn}>
      <h1 className="h4 mb-3 font-weight-normal">Create Assignment</h1>
      <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
              className="form-control"
              name="title"
              placeholder="Enter Assignment Title"
              value={this.state.title}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
      <label htmlFor="due_date">Due date</label>
      <input type="date"
          className="form-control"
          name="due_date"
          placeholder="Enter Due date"
          value={this.state.due_date}
          onChange={this.onChangeText}
      />
  </div>
      <div className="form-group">
          <label htmlFor="content">Assignment Question/Requirements</label>
          <textarea  name="content" 
                    className="form-control"
                    value={this.state.content} 
                    placeholder="Enter Assignment Question or Requirements"
                    onChange={this.onChangeText}/> 
      </div>
      <div className="form-group">
      <label htmlFor="total_points">Total Points</label>
      <input type="number" name="total_points"   min="0" max="100"
                className="form-control"
                value={this.state.total_points} 
           
                onChange={this.onChangeText}/> 
  </div>
     
      <button type="submit"
          className="btn btn-lg btn-primary btn-block">
          Publish
      </button>
      {msg}
  </form>
</div> 
  }

  if(this.state.showComponentCrtAnc){
    details = 
      <div >
      <form style={{"margin-left": "50px","width": "700px"}} noValidate onSubmit={this.onSubmitCrtAnc}>
      <h1 className="h4 mb-3 font-weight-normal">Make Announcement</h1>
      <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
              className="form-control"
              name="title"
              placeholder="Enter Announcement Title"
              value={this.state.title}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="content">Announcement Content</label>
          <input type="text"
              className="form-control"
              name="content"
              placeholder="Enter Announcement Content"
              value={this.state.content}
              onChange={this.onChangeText}
          />
      </div>
     
      <button type="submit"
          className="btn btn-lg btn-primary btn-block">
          Publish
      </button>
  </form>
</div> 
  }

  if(this.state.showComponentCrtLec){
    details = 
      <div >
      <form noValidate onSubmit={this.onSubmitCrtLec}>
      <h1 className="h4 mb-3 font-weight-normal">Post Lecture Notes/Files</h1>
 {/*     <form style={{"margin-left":"50px"}} onSubmit={this.onSubmit}> */}
      <Button variant="contained"
      label='My Label'>
      <input type="file" name="common_name" onChange = {this.onChangeFile}/>
    </Button>
 
   <div style={{"padding":"10px"}}> <button type="submit"  class="btn btn-primary">Post</button>  </div>
   </form>
</div> 
  }

  if(this.state.showComponentRmvStd){
    details = 
      <div >
      <form noValidate onSubmit={this.onSubmitRmvStd}>
      <h1 className="h4 mb-3 font-weight-normal">Remove Student from Course</h1>
      <div className="form-group">
          <label htmlFor="user_email">Student Email</label>
          <input type="text"
              className="form-control"
              name="user_email"
              placeholder="Enter Student Email"
              value={this.state.user_email}
              onChange={this.onChangeText}
          />
      </div>
      {/*
      <div className="form-group">
          <label htmlFor="content">Course ID</label>
          <input type="text"
              className="form-control"
              name="content"
              placeholder="Enter Announcement Content"
              value={this.state.targetId}
              onChange={this.onChangeText}
          />
      </div> */}
     
      <button type="submit"
          className="btn btn-lg btn-primary btn-block">
          Submit 
      </button>
      {mesg}
  </form>
</div> 
  }

  if(this.state.showComponentCrtQuiz){
    details = 
      <div >
      <form noValidate onSubmit={this.onSubmitCrtQuiz}>
      <h1 className="h4 mb-3 font-weight-normal">Create Quiz</h1>
      <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
              className="form-control"
              name="title"
              placeholder="Enter Quiz Title"
              value={this.state.title}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="content">Question</label>
          <input type="text"
              className="form-control"
              name="content"
              placeholder="Enter Quiz Question"
              value={this.state.content}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="optA">Option A</label>
          <input type="text"
              className="form-control"
              name="optA"
              placeholder="Enter Option A"
              value={this.state.optA}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="optB">Option B</label>
          <input type="text"
              className="form-control"
              name="optB"
              placeholder="Enter Option B"
              value={this.state.optB}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="optC">Option C</label>
          <input type="text"
              className="form-control"
              name="optC"
              placeholder="Enter Option C"
              value={this.state.optC}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
          <label htmlFor="optD">Option D</label>
          <input type="text"
              className="form-control"
              name="optD"
              placeholder="Enter Option D"
              value={this.state.optD}
              onChange={this.onChangeText}
          />
      </div>
      <div className="form-group">
      <label htmlFor="answer">Correct Answer</label>
      <input type="text"
          className="form-control"
          name="answer"
          placeholder="Enter Correct Answer Option"
          value={this.state.answer}
          onChange={this.onChangeText}
      />
  </div>
  <div className="form-group">
  <label htmlFor="due_date">Due Date</label>
  <input type="text"
      className="form-control"
      name="due_date"
      placeholder="Enter date format mm/dd/yyy"
      value={this.state.due_date}
      onChange={this.onChangeText}
  />
</div>
<button id="btn_space" type="submit"
className="btn btn-primary">
Add Question
</button>
      <button type="submit"
          className="btn btn-primary">
          Publish Quiz
      </button>
  </form>
</div> 
    
  }

if(this.state.showComponentPpl)
{
  
let  det =  this.state.people.map(person => {
 
     return(
       <tr>
       <td>{person.user_name}</td>
       <td>{person.user_email}</td>
       <td>{person.user_type}</td>
       </tr>
     )
 
 })
 
 details = 

   <div class="container">
   <table>
       <thead>
           <tr>
               <th>Name</th>
               <th>Email Address</th>
               <th>Role</th>
           </tr>
       </thead>
       <tbody>
           {renderTodos}
       </tbody>
   </table>
   <div style={{"margin-top":"440px"}}>
   <ul>

 </ul>
 <ul id="page-numbers">
   {renderPageNumbers}
 </ul>
 </div>
 </div> 

 }

 if(this.state.showComponentGrd)
 {
   
    let  sumgrade =  this.state.gradesum.map(gradesum => { return gradesum.sum_grade } )
    let  sumoutof =  this.state.gradesum.map(gradesum => { return gradesum.sum_outof } )

   console.log("in render sum grade: " + sumgrade + " " + sumoutof)

 let  det =  this.state.grades.map(grade => {
  
      return(
        <tr>
        <td>{grade.task_type}</td>
        <td>{grade.task_title}</td>
        <td>{grade.task_grade}</td>
        <td>{grade.task_outof}</td>
        </tr>
      )
  
  })


details = 
  <div  style={{"margin-left":"0px"}}  class="content-wrapper">
  <section className="content-header">
  <div className="container">
  <div className="row">
  <div className="col-md-6 mt-5 mx-auto">
  <div class="container">
  <table  >
      <thead>
          <tr>
          <th>Category</th>
          <th>Title</th>
          <th>Score</th>
          <th>Out of</th>
          </tr>
      </thead>
      <tbody>
          {det}
      </tbody>
  </table>
<div >
  <span style={{"font-weight":"bold","color":"#3c8dbc" }}> Total Grade: {" "} {sumgrade} </span><br></br>
  <span style={{"font-weight":"bold","color":"#3c8dbc" }}> Out of: {" "} {sumoutof} </span>
</div> 
</div>
</div> 
</div>
</div>
</section>
</div>
}


 if(this.state.hideAllComponent)
{
  
    details = 
  <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
  <section className="content-header">
  <div className="container">
  <div className="row">
  <div className="col-md-6 mt-5 mx-auto">
  <div class="container">
  <h1>Heeeeeeeeerrrreeeee</h1>
  </div> 
</div> 
</div>
</div>
</section>
</div>
}

if(this.state.showComponentQz)
{
 let det =  this.state.quizzes.map(quiz => {

    return(
      <tr>
      <td><Link to={`/dashboard/genCode/${this.state.targetId}/${quiz._id}`} onClick={this._onLinkClick}>{quiz.title}</Link></td>
      <td>{quiz.posted_on}</td>
      <td>{quiz.due_date}</td>
      </tr>
    )

})

details = 
  <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
  <section className="content-header">
  <div className="container">
  <div className="row">
  <div className="col-md-6 mt-5 mx-auto">
  <div class="container">
  <table >
      <thead>
          <tr>
              <th>Title</th>
              <th>Posted On</th>
              <th>Due Date</th>
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
}

if(this.state.showComponentAnc)
{
 let det =  this.state.announces.map(announce => {

    return(
      <tr>
      <td>{announce.title}</td>
      <td>{announce.posted_on}</td>
      <td>{announce.content}</td>
      </tr>
    )

})

details = 
  <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
  <section className="content-header">
  <div className="container">
  <div className="row">
  <div className="col-md-6 mt-5 mx-auto">
  <div class="container">
  <table  >
      <thead>
          <tr>
              <th>Title</th>
              <th>Posted On</th>
              <th>Content</th>
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
}

if(this.state.showComponentLec)
{
  let det =  this.state.lects.map(lec => {
 
     return(
       <tr>
  {/*      <td><button className="btn btn-link"  type='button' onClick={ this._onLinkClick} >{assn.title}</button> </td>*/}
 
    <td> <a href={'http://localhost:3001/'+`${lec.user_file}`} target="_blank">{lec.user_file}</a> </td> 
       <td>{lec.posted_on}</td>
     
       </tr>
     )
 
 })
 
 details = 
   <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
   <section className="content-header">
   <div className="container">
   <div className="row">
   <div className="col-md-6 mt-5 mx-auto">
   <div class="container">
   <table  style={{"margin-left":"-50px"}}>
       <thead>
           <tr>
               <th>File</th>
               <th>Posted On</th>
           
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
 }

if(this.state.showComponentAsn)
{
  let det =  this.state.assns.map(assn => {
 
     return(
       <tr>
  {/*      <td><button className="btn btn-link"  type='button' onClick={ this._onLinkClick} >{assn.title}</button> </td>*/}
 
    <td> <Link to={`/dashboard/assigns/${this.state.targetId}/${assn._id}`} onClick={this._onLinkClick}>{assn.title}</Link></td> 
       <td>{assn.posted_on}</td>
       <td>{assn.content}</td>
       <td>{assn.due_date}</td>
       <td>{assn.total_points}</td>
       </tr>
     )
 
 })
 
 details = 
   <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
   <section className="content-header">
   <div className="container">
   <div className="row">
   <div className="col-md-6 mt-5 mx-auto">
   <div class="container">
   <table  style={{"margin-left":"-50px"}}>
       <thead>
           <tr>
               <th>Title</th>
               <th>Posted On</th>
               <th>Content</th>
               <th>Due On</th>
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
 }

let menu =''
 if(this.state.user_type == "faculty")
    menu=   <li> <i className="fa fa-user"></i><button className="btn btn-link"  type='button' onClick={ this._onButtonFaculty } >Faculty</button>  </li> 



  let coursename = [];
      coursename = this.state.course.map(crs => {

          return(
             crs.course_name
          )})

  return (
      <div>
   
      <div class="content-wrapper">
      <nav className={ cssClasses }>
      <ul>
      
       {/*} <li><MenuItem label='Announcements' link='/announce' icon='fa fa-bullhorn' course={this.props.targetId}/></li>{*/}
       <li> <i className="fa fa-bullhorn"></i><button className="btn btn-link"  type='button' onClick={ this._onButtonClickAnc } >Announcements</button> </li>
       <li> <i className="fa fa-users"></i><button className="btn btn-link"  type='button' onClick={ this._onButtonClickPpl } >People</button>  </li>
       <li> <i className="fa fa-star"></i><button className="btn btn-link"  type='button' onClick={ this._onButtonClickGrd } >Grades</button> </li>
     {/*   <li> <i className="fa fa-edit"></i><button className="btn btn-link" type='button' onClick={ this._onButtonClickAsn } >Assignment</button>  </li> */}
        <li> <i className="fa fa-edit"></i><button className="btn btn-link" type='button' onClick={ this._onButtonClickAsn } >Assignments</button>  </li>
        <li> <i className="fa fa-file-pdf-o"></i><button className="btn btn-link" type='button' onClick={ this._onButtonClickLec } >Lecture Notes</button>  </li>
        <li> <i className="fa fa-question-circle"></i><button className="btn btn-link"  type='button' onClick={ this._onButtonClickQz } >Quiz</button>  </li>
      
      {menu}
    {/*}    <li><Link to="/genCode">Quiz </Link></li>
    <li><Link to="/genCode">Lecture Notes </Link></li> */}
        </ul>
      </nav>
      <section style={{"margin-left":"300px"}} className="content-header">
      <div className="container">
          <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
      <h3 style={{"color":"#3c8dbc","margin-left":"50px", "white-space":"nowrap"}}>CMPE {" "} {this.state.targetId}{" "}{coursename} </h3>
     
   {details}
      </div>
        </div>
        </div>
        </section>
    
        </div>
            </div>
  );
}
}
/*
CourseMenu.propTypes = {
  menuItems: PropTypes.array,
  opened: PropTypes.bool,
};

CourseMenu.defaultProps = {
  menuItems: [],
  opened: false,
};
*/
export default CourseMenu;
