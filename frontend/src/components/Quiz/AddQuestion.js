import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{question: "",
            answers:[{is_correct: false},{value: ""}]
        }],
            course_id: '',
            title:'',
            due_date:'',
            quizCreated:[],
            rescode:0,
            msgflag: false,
            optA:'',
            optB:'',
            optC:'',
            optD:'',
            optAval:false,
            optBval:false,
            optCval:false,
            optDval:false,
            question:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
   
      }
      
      componentDidMount () {
        const { course_id } = this.props.match.params
       // console.log("this.props.location.state:" + this.props.location.state)
      //  console.log("this.props.location.state2:" + JSON.stringify(this.props.location.state))
      //  const { course_id } = this.props.location.state.course_id
       console.log("courseid in addquestion: " + course_id)
        this.setState({ course_id: course_id });
        console.log(" course_id2 :"+ this.state.course_id );
      //  console.log("handle in addquestion: " + handle)
      }

      addClick(){
        this.setState(prevState => ({ 
            users: [...prevState.users, { question: "", answers:[{is_correct: false,value: ""}] }]
        }))
      }
      
      onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onChangeText1 (e) {
        console.log("boolean" + this.str2bool(e.target.value))
        this.setState({ [e.target.name]: this.str2bool(e.target.value) }) 
    }
      createUI(){
         return this.state.users.map((el, i) => (
           <div className="form-group" key={i}>
           <div className="form-group"> <label htmlFor="due_date">Question</label>
           
              <input  className="form-control" placeholder="Question" name="question" value={this.state.question} 
              onChange={this.onChangeText} />
            </div>
         
           <div className="form-group"> <label htmlFor="due_date">Choice 1</label>
           <input placeholder="Enter Answer 1" name="optA" value={this.state.optA} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Is this the Right Answer? if yes then change to 'true'</label>
           <input placeholder="Enter 'true' (if right) else 'false' " name="optAval" value={this.state.optAval} onChange={this.onChangeText} />
            </div>
            <div className="form-group"> <label htmlFor="due_date">Choice 2</label>
           <input placeholder="Enter Answer 2" name="optB" value={this.state.optB} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Is this the Right Answer? if yes then change to 'true'</label>
           <input placeholder="Enter 'true' (if right) else 'false' " name="optBval" value={this.state.optBval} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Choice 3</label>
           <input placeholder="Enter Answer 3" name="optC" value={this.state.optC} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Is this the Right Answer? if yes then change to 'true'</label>
           <input placeholder="Enter 'true' (if right) else 'false' " name="optCval" value={this.state.optCval} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Choice 4</label>
           <input placeholder="Enter Answer 4" name="optD" value={this.state.optD} onChange={this.onChangeText} />
           </div>
           <div className="form-group"> <label htmlFor="due_date">Is this the Right Answer? if yes then change to 'true'</label>
           <input placeholder="Enter 'true' (if right) else 'false' " name="optDval" value={this.state.optDval} onChange={this.onChangeText} />
           </div>
              {/*        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>*/}
           </div>          
         ))
      }

      handleChange(i, e) {
        const { name, value } = e.target;
        let users = [...this.state.users];
        users[i] = {...users[i], [name]: value};
        this.setState({ users });
     }
     

     removeClick(i){
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
     }
     
     handleSubmit(event) {
       alert('Question submitted: ' + JSON.stringify(this.state.users));
       console.log("this.state.users: " + this.state.users )
   //    let title = ''
  
    let question = this.state.users.map(quiz => {return quiz.question})
  /*  let optA = this.state.users.map(quiz => {return quiz.optA})
    let optB = this.state.users.map(quiz => {return quiz.optB})
    let optAval = this.state.users.map(quiz => {return quiz.optAval})
    let optBval = this.state.users.map(quiz => {return quiz.optBval}) */

    console.log("title: " + this.state.title)
    console.log("question: " + question)
       event.preventDefault();
       axios.post('/course/quiz', {
        course_id: this.state.course_id,title:this.state.title,due_date:this.state.due_date



    })
    .then(response => {
        console.log("response data: " + JSON.stringify(response.data))
        console.log("response status: " + JSON.stringify(response.status))
        this.setState({
            quizCreated : response.data
        });

        if(response.status === 201){
    console.log("Response code 201!");
        
    this.setState({
        msgflag : true
    })
    }
    })

     }
       
   

     handleSubmit1(event) {
        event.preventDefault();
        console.log("quiz id: " + this.state.quizCreated._id)
let quiz_id=this.state.quizCreated._id
//let quiz_id = this.state.quizCreated.map(quiz => {return quiz.quiz_id})
//console.log("quiz id111: " + quiz_id)


/*
let question = this.state.users.map(quiz => {return quiz.question})
let optA = this.state.users.map(quiz => {return quiz.optA})
let optB = this.state.users.map(quiz => {return quiz.optB})
let optAval = this.state.users.map(quiz => {return quiz.optAval})
let optBval = this.state.users.map(quiz => {return quiz.optBval})
*/

console.log("optA: " + this.state.optA)
console.log("optAval: " + this.state.optAval)
console.log("question: " + this.state.question)



var boolOptAval = (this.state.optAval =="true");

console.log("boolOptAval: " + boolOptAval)


     axios.post('/course/addquestion', {
        _id: quiz_id,question:this.state.question,
        optionA: this.state.optA, optionB:this.state.optB,optionC:this.state.optC,optionD:this.state.optD, optionAval:boolOptAval,
        optionBval:this.state.optBval,optionCval:this.state.optCval,optionDval:this.state.optDval
     })
     .then(response => {
        console.log("response data2: " + JSON.stringify(response.data))
        console.log("response status2: " + JSON.stringify(response.status))

     if(response.status === 200){
        console.log("3rd Response code 200!");
     
        this.setState({
            rescode : 200
        })
    } 
     })

    }

    render() {
        let det=''
        if(this.state.rescode==200){

            det=  <div>Question added. Add more question or exit when done!!</div>
          }
        console.log("msgflag " + this.state.msgflag)
        let sub_type = ''
        if(this.state.msgflag == false){
            sub_type =    <input type="submit" className="btn btn-primary" value="Submit"  onClick={this.handleSubmit} />
        }
        else 
        if(this.state.msgflag == true){
            sub_type =   <input type="submit" className="btn btn-primary" value="Submit"  onClick={this.handleSubmit1} />
        }

        return(
          <div class="content-wrapper">
          <section className="content-header">
          <div className="container">
              <div className="row">
                  <div className="col-md-6 mt-5 mx-auto">

                  <form style={{"max-width": "400px"}} noValidate onSubmit={this.handleSubmit1} >
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
  <label htmlFor="due_date">Due Date</label>
  <input type="text"
      className="form-control"
      name="due_date"
      placeholder="Enter date format mm/dd/yyy"
      value={this.state.due_date}
      onChange={this.onChangeText}
  />
</div>
<input type="submit" className="btn btn-primary" value="Confirm Quiz"  onClick={this.handleSubmit} />
                  {this.createUI()}         
<input type="submit" className="btn btn-primary" value="Add Question" />
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
  export default AddQuestion