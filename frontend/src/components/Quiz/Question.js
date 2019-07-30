import React, { Component } from 'react';

class Question extends Component {
 

  render(){
    var optionsNodes = Object.keys(this.props.data.answers).map(function(value, index){
      return (
        <div>
          <input
            type="checkbox"
            id={index}
            onChange={this.props.fetchAnswer}
            defaultChecked={this.props.chkBox}
            value={value}
          />
          <label htmlFor={index}>
            {(parseInt(index) + 1) + ".  " + this.props.data.answers[index].value}
          </label>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <h4 className="h4 mb-3 font-weight-normal">
        {(parseInt(this.props.id) + 1) + ")  " + this.props.data.question}</h4>
       
          {optionsNodes}
          <br/>
          <button type="button" onClick={this.props.validateAnswers}>
              Next
          </button>
    
      </div>
    );
  }
}

export default Question
