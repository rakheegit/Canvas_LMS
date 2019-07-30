import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import "./testcourse.css";
import ListItem from "./ListItem";
import _ from "lodash";
import Template from './Template';
import CourseMenu from './CourseMenu';
import MenuItem from './MenuItem';
import { crtAnc } from './myfunctions';
import { crtQuiz } from './myfunctions';
//import { rmvStd  } from './myfunctions';
import Assignment from './Assignment';

class Dashboard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
           courses:[],
           user_type:'',
           targetId: null,
           tarId: '',
           authFlag: false,
           showComponentPpl: false,
           showComponentAnc: false,
           showComponentAsn: false,
           showComponentViewAsn: false,
           showComponentFac:false,
           people:[],
           announces:[],
           assns:[],
           assigns:'',
           file:null,
           create_type:'',
           showComponentCrtAnc: false,
           showComponentCrtQuiz: false,
           showComponentRmvStd: false,
           title:'',
           content:'',
           optA: '',
           optB:'',
           optC:'',
           optD:'',
           answer:'',
            due_date:'',
           hideAllComponent:false,
           user_email:'',
           msgflag:false
        }
        this._onButtonClick = this._onButtonClick.bind(this);
        this._onLinkClick = this._onLinkClick.bind(this);
        this._onButtonClickAnc = this._onButtonClickAnc.bind(this);
        this._onButtonClickQz = this._onButtonClickQz.bind(this);
       this._onButtonClickAsn = this._onButtonClickAsn.bind(this);
       this._onButtonClickViewAsn = this._onButtonClickViewAsn.bind(this);
       this._onButtonFaculty = this._onButtonFaculty.bind(this);
       this.onDragStart = this.onDragStart.bind(this);
       this.onDragOver = this.onDragOver.bind(this);
       this.onDragEnd = this.onDragEnd.bind(this);
       
       
   //     this._onButtonClickLec = this._onButtonClickLec.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.onSubmit1 = this.onSubmit1.bind(this);
   this.onSubmitCreate = this.onSubmitCreate.bind(this);
   this.onChange = this.onChange.bind(this);
   this.onChangeText = this.onChangeText.bind(this);
   this.onChangeRadio = this.onChangeRadio.bind(this);
   this.onSubmitCrtAnc = this.onSubmitCrtAnc.bind(this);
   this.onSubmitCrtQuiz = this.onSubmitCrtQuiz.bind(this);
   this.onSubmitRmvStd = this.onSubmitRmvStd.bind(this);
    }
    onDragStart = (e, index) => {
        this.draggedItem = this.state.courses[index];
        e.dataTransfer.effectAllowed = "move";
   //     e.dataTransfer.setData("text/html", e.target.parentNode);
    //    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
      };
      onDragOver = index => {
        const draggedOverItem = this.state.courses[index];
    
        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
          return;
        }
          // filter out the currently dragged item
    let courses = this.state.courses.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    courses.splice(index, 0, this.draggedItem);

    this.setState({ courses });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

    _onLinkClick(e) {
       
        console.log("clicked link...")
        this.setState({
          showComponentPpl: false,
          showComponentAnc:false,
          showComponentAsn:false,
          showComponentViewAsn:false,
          showComponentFac:false,
          hideAllComponent:true,
         
            tarId: "yes"

        });
    
        console.log("state.showcomponentPpl1" +  this.state.showComponentPpl)
    }
    
    _onButtonClick(e) {
      this.setState({
        showComponentPpl: true,
        showComponentAnc:false,
        showComponentAsn:false,
        showComponentViewAsn:false,
        showComponentFac:false
      });
      console.log("state.showcomponentPpl1" +  this.state.showComponentPpl)
console.log("targetId for getting people: " + this.state.targetId)
      e.preventDefault()

      axios.get('/studentsearchbycourse',{
          params:{course_id: this.state.targetId}
      })
      .then((response) => {
        console.log("printing people response" + JSON.stringify(response))
   
      this.setState({
   //       people :  this.state.people.concat(response.data) 
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
  onSubmitCreate (e) {
    e.preventDefault()
  if(this.state.create_type === "Announcement") {
    this.setState({
      showComponentCrtAnc: true
    })
}
    if(this.state.create_type === "Quiz") {
        this.setState({
          showComponentCrtQuiz: true
        })

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
  axios.post('/coursedeenrollment', {
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

  _onButtonClickQz(e) {
    this.setState({
        showComponentQz: true,
      showComponentAnc: false,
      showComponentPpl:false,
      showComponentAsn:false,
      showComponentViewAsn:false,
      showComponentFac:false
    });
    console.log("state.showcomponentQz1" +  this.state.showComponentQz)
console.log("targetId for getting quizzes: " + this.state.targetId)
    e.preventDefault()

    axios.get('/coursegetquiz',{
        params:{course_id: this.state.targetId}
    })
    .then((response) => {
      console.log("printing quizzes response" + JSON.stringify(response))
 
    this.setState({
      announces :  (response.data).slice(0)
      
    });
})
    .catch(err => {
        console.log(err)
    })
  }

    _onButtonClickAnc(e) {
      this.setState({
        showComponentAnc: true,
        showComponentPpl:false,
        showComponentAsn:false,
        showComponentViewAsn:false,
        showComponentFac:false
      });
      console.log("state.showcomponentAnc1" +  this.state.showComponentAnc)
console.log("targetId for getting announces: " + this.state.targetId)
      e.preventDefault()

      axios.get('/coursegetannouncement',{
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
        showComponentPpl:false,
        showComponentAsn:false,
        showComponentViewAsn:false,
        showComponentFac:true
      });
      console.log("state.showcomponentAsn1" +  this.state.showComponentFac)
console.log("targetId for getting Assigns: " + this.state.targetId)
     
    }


    _onButtonClickAsn() {
      this.setState({
        showComponentAnc:false,
        showComponentPpl:false,
        showComponentAsn:true,
        showComponentViewAsn:false,
        showComponentFac:false
      });
      console.log("state.showcomponentAsn1" +  this.state.showComponentAsn)
console.log("targetId for getting Assigns: " + this.state.targetId)
     
   
    }
    
    _onButtonClickViewAsn(e) {
      this.setState({
        showComponentAnc:false,
        showComponentPpl:false,
        showComponentAsn:false,
        showComponentViewAsn:true,
        showComponentFac:false        
      });
      console.log("state.showcomponentViewAsn1" +  this.state.showComponentViewAsn)
console.log("targetId for getting Assigns: " + this.state.targetId)

      e.preventDefault()

      axios.get('/coursegetassns',{
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

    onSubmit(e){
      console.log("in onSubmit: " + this.state.file)
      const formData = new FormData();
      formData.append('common_name', this.state.file);
  formData.append('course_id', this.state.targetId);
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};
      e.preventDefault()
      axios.post('/studentcreateassignment1',formData,config)
     //   },
     //   course_id: this.state.targetId
   //   })
      .then((response) => {
        alert("The file is successfully uploaded");
        console.log("printing Assigns response" + JSON.stringify(response))
   
      this.setState({
          assigns :  response.data
        
      });
  })
      .catch(err => {
          console.log(err)
      })
      }
      onSubmit1(e){
        console.log("in onSubmit: " + this.state.file)
        const formData = new FormData();
        formData.append('common_name', this.state.file);
    formData.append('course_id', this.state.targetId);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
        e.preventDefault()
        axios.post('/studentcreateassignment2',formData,config)
       //   },
       //   course_id: this.state.targetId
     //   })
        .then((response) => {
          alert("The file is successfully uploaded");
          console.log("printing Assigns response" + JSON.stringify(response))
     
        this.setState({
            assigns :  response.data
          
        });
    })
        .catch(err => {
            console.log(err)
        })
        }
    componentDidMount () {
        const token = localStorage.getItem('usertoken');
        axios.get('/users/courses',
            {headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}}
        )
        .then((response) => {
             console.log("printing response" + JSON.stringify(response))
        //update the state with the response data
     
        this.setState({
            courses : this.state.courses.concat(response.data.user_courses) 
          
        });
        this.setState({
            user_type: response.data.user_type
          
        });
   
       console.log("user type: " + JSON.stringify(this.state.user_type))
    })
        .catch(err => {
            console.log(err)
        }) 
}
handleOnClick = (id,name) => {
  const courses = _.cloneDeep(this.state.courses);
console.log("id : " + id)
  return () => {
    this.setState({ 
      targetId: id ,
      targetName: name,
      authFlag:true
    })
    console.log("this.props.history: " + JSON.stringify(this.props.history))
  //  this.props.history.push('/courseMenu')
  
}
  //this.setState({ courses });
};

onChange(e) {
  this.setState({file: e.target.files[0]});
}
onChangeText(e) {
  this.setState({ [e.target.name]: e.target.value })
}

render() {
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/signin"/>
    }
    
  let details = null;
  if(this.state.showComponentFac){
    details = 
      <div >
      <form noValidate onSubmit={this.onSubmitCreate}>
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
                                value="Lecture Notes/Files"
                                onChange={this.onChangeRadio}
                                checked={this.state.create_type === "Lecture Notes/Files"}
                            />{" "}
                            Publish Lecture Notes/Files
                            </label>{" "}
                        </div>
                        <div className="form-group">
                        <label>
                        <input type="radio"
                            name="create_type"
                            value="Quiz"
                            onChange={this.onChangeRadio}
                            checked={this.state.create_type === "Quiz"}
                        />{" "}
                        Create Quiz
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

                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Submit
                            </button>
                            <br/>
                        </form>
</div> 
    
  }
let msg =[]
  if(this.state.msgflag==true){
    msg = 
      <div > Student Removed from course successfully </div>
  }

  if(this.state.showComponentCrtAnc){
    details = 
      <div >
      <form noValidate onSubmit={this.onSubmitCrtAnc}>
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
      {msg}
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
     
      <button type="submit"
          className="btn btn-lg btn-primary btn-block">
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
   <div  style={{"margin-left":"0px","display":"flex"}} class="content-wrapper">
   <section className="content-header">
   <div className="container">
   <div className="row">
   <div className="col-md-6 mt-5 mx-auto">
   <div class="container">
   <table  style={{"margin-left":"-50px"}}>
       <thead>
           <tr>
               <th>Name</th>
               <th>Email Address</th>
               <th>Role</th>
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
 let det =  this.state.announces.map(quiz => {

    return(
      <tr>
      <td><Link to={`/dashboard/genCode/${quiz.title}`} onClick={this._onLinkClick}>{quiz.title}</Link></td>
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
  <table  style={{"margin-left":"-50px"}}>
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
  <table  style={{"margin-left":"-50px"}}>
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

if(this.state.showComponentViewAsn)
{
  let det =  this.state.assns.map(assn => {
 
     return(
       <tr>
  {/*      <td><button className="btn btn-link"  type='button' onClick={ this._onLinkClick} >{assn.title}</button> </td>*/}
    <td> <Link to={`/dashboard/${assn.title}`} onClick={this._onLinkClick}>{assn.title}</Link></td> 
       <td>{assn.posted_on}</td>
       <td>{assn.content}</td>
       <td>{assn.due_date}</td>
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
 
  


  const cssClasses = 'side-menu-fixed open';
  const { courses } = this.state;


  

  return (
    <div class="content-wrapper">
         <section className="content-header">
         <div className="container">
             <div className="row">
                 <div className="col-md-6 mt-5 mx-auto">
                 <div className="form-group">
    <div className="Tile">
    
  {/*}    <ul style={{"margin-top": "200px", "width": "42em","columns":"2", "float": "left"}}>  */}
    <ul style={{"margin-left": "-200px", "height": "200px", "display": "flex","flex-direction": "column", "flex-wrap": "wrap"}}>
        {courses.map((chore, idx) => (
            <div  draggable  onDragStart={e => this.onDragStart(e, idx)}
            onDragEnd={this.onDragEnd}
            onDragOver={() => this.onDragOver(idx)}>
            <Link to={`/dashboard/course/${chore.course_id}/${this.state.user_type}` } onClick={this._onLinkClick}>
          <ListItem 
      //    draggable  onDragStart={this.onDragStart}
            key={chore.id}
            id={chore.id}
            course_id={chore.course_id}
            course_dep={"CMPE"}
            course_name={chore.course_name}
    //        course_name={chore.course_name}
    //        course_dep={chore.course_dep}
    //        course_term={chore.course_term}
       //     handleOnClick={this.handleOnClick(chore.course_id,chore.course_name)}
      
          />
          </Link>
          </div>
        ))}
       
      </ul>
      
    </div>

 {/*   <Template targetId={this.state.targetId} /> 
    <CourseMenu targetId={this.state.targetId} targetName={this.state.targetName} /> */}

    {redirectVar}
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
  );
}
}

export default Dashboard;
