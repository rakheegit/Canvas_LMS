import axios from 'axios';
import React, { Component } from 'react';
import Question from "./Question";

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {

      quiz: {},
      position: 0,
      student_answers: [],
      ischecked: false,
      course_id:'',
      quiz_id: ''
    }
    this.fetchAnswer = this.fetchAnswer.bind(this)
    this.nextOne = this.nextOne.bind(this)
    this.uncheck = this.uncheck.bind(this)
  }

  componentDidMount(){
    console.log("params " + JSON.stringify(this.props.match.params))
    const { quiz_id } = this.props.match.params
    const { course_id } = this.props.match.params

    this.setState({course_id:  course_id, quiz_id: quiz_id})

    console.log("course_id in quiz:" + this.state.course_id + this.state.quiz_id )

    axios.get(`/course/quiz/${quiz_id}`)
    .then((result) => {
      this.setState({quiz: result.data});
    //  this.setState({user :  this.state.user.concat(user.data)})
      console.log("result " + JSON.stringify(result.data))
    //  console.log("user array " + JSON.stringify(this.state.user))
   //   console.log("quiz obj " + JSON.stringify(this.state.quizz.quiz_items))
  //   let q_items1 = JSON.stringify(this.state.quizz.quiz_items)
  //   this.setState({q_items :  user.data.quiz_items[0]})
  //   console.log("q_items question" + this.state.q_items.question)
  //   console.log("q_items question " + q_items1[0].question)
  console.log("quiz obj " + JSON.stringify(this.state.quiz.questions))
  console.log("quiz obj " + this.state.quiz.questions)
    })

/*
    $.getJSON("./assets/quiz.json", function(result) {
      this.setState({quiz: result});
    }.bind(this)) */
  }

  nextOne(){
    console.log("in nextOne()" + this.state.position)
    this.setState({position: (this.state.position + 1)});
    this.uncheck();
  }

  uncheck(){
    console.log ("i am called")
    if(this.state.ischecked === true)
      console.log ("i am true")
    this.setState({ischecked:  false})
    
  }

  fetchAnswer(event){
    console.log("in fetchAnswer()" + this.state.position + this.state.student_answers[0])
    this.state.student_answers[this.state.position] = this.state.student_answers[this.state.position] || [];
    this.state.student_answers[this.state.position][parseInt(event.target.value)] = event.target.checked;
  }

  isAnswerCorrect(index){
    var result = true;
    Object.keys(this.state.quiz.questions[index].answers).map(function(value, answer_index){
      var answer = this.state.quiz.questions[index].answers[value]
      if (!this.state.student_answers[index] || (answer.is_correct != (this.state.student_answers[index][value] || false))) {
        result = false;
      }
    }.bind(this));
    return result;
  }

  calcScore(index){
    var score = 0
    Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerCorrect(parseInt(value))) {
        score = score + 1;
      }
    }.bind(this));

    axios.post('/course/quizgrade', {
      course_id: this.state.course_id,
      task_id: this.state.quiz_id,
      task_title: this.state.quiz.title,
      task_grade: score,
      task_outof: this.state.position

  })
  .then(data => console.log(data)
  
  ) 
  .catch(err => console.log(err))

    return score;
  }

  renderSummaryPage(){

    var result = Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerCorrect(value)) {
        return (
          <div>{"Question " + index + ": Correct Answer"}</div>
        )
      } else {
        return (
          <div>{"Question " + index + ": Wrong Answer"}</div>
        )
      }
    }.bind(this));
    return (
      <div>
        <h3>Score</h3>
        <div style={{"padding":"10px"}}>
          {this.calcScore()} {" "} Out of {" "} {this.state.quiz.questions.length}
        </div>
        <div>
        <div style={{"border-top":"4px solid #3c8dbc","padding":"10px"}}></div>
          <p style={{"font-weight":"900"}}>Summary Report</p>
            {result}
        </div>
      </div>
   );
  }

  render(){
    console.log("helloooooooooo in render")
    if (!this.state.quiz.questions) {return <div  style={{"color":"red"}}></div>}
    return (
      <div  class="content-wrapper">
      <section className="content-header">
      <div className="container">
          <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
            
             <div style={{"margin-top":"150px"}}>
        <h1 style={{"margin-left":"220px"}}>{this.state.quiz.title}</h1>
        <form   >
        <div  className="form-group">
        {(this.state.position < this.state.quiz.questions.length
          ? (<Question
                id={this.state.position}
                data={this.state.quiz.questions[this.state.position]}
                validateAnswers={this.nextOne}
                chkBox={this.state.ischecked}
                fetchAnswer={this.fetchAnswer}/>)
                
          : (<div>{this.renderSummaryPage()}</div>)
        )}

</div>
</form>
</div>
      </div>
</div>
</div>
</section>
</div>
    )
  }
}

export default Quiz
