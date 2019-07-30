import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { newMsg } from "../../actions/msgActions";
import PropTypes from 'prop-types';

class NewMessage extends Component {

    componentWillMount(){
        this.setState({
            rcode : 0
        })
    }


    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="text" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }
      renderField1(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
          <label>{field.label}</label>
          <textarea  name="message_text" placeholder="Type Message Here"
          className="form-control" {...field.input}/>
          <div className="text-help">
              {touched ? error : ""}
            </div>
      </div>
        );
      }

    onSubmit(values) {
        console.log("values: " + values);
        this.props.newMsg(values, () => {
          console.log("i am here before push");
          console.log("rescode onsumbit: " + JSON.stringify(this.props.rescode))
          let stat_code = this.props.rescode
          let s_code = Object.keys(stat_code).map(function(key){ return stat_code[key] })
          if(s_code==201) {
            this.props.history.push("/inbox");
          }
            else if(s_code==202){
            console.log("Response code 202!");
            this.setState({
                rcode : 202
            })}
            else if(s_code==500){
              this.setState({
                  rcode : 500
              }) 
          }
          
      //    if(Object.keys(this.props.rescode).map(function(key){ return this.props.rescode[key] })=='201')
       //   this.props.history.push("/signin");
        });
      }

    

    render () {
        const { handleSubmit } = this.props;

        console.log("rescode: " + JSON.stringify(this.props.rescode))
        /*
        let stat_co = JSON.stringify(this.props.rescode)
        let stat_code = this.props.rescode
        console.log("stat_code.status: " + Object.keys(stat_code).map(function(key){ return stat_code[key] }))
        let s_code = Object.keys(stat_code).map(function(key){ return stat_code[key] })
        let det = ''
        if(s_code==201) {
          this.props.history.push("/signin");
        }
        */
        let det = ''
       if(this.state.rcode==202)
          det=  <div style={{"color":"red"}}>User already registered!</div>
          else if(this.state.rcode==500)
          det=  <div> Error! </div>
    

        return (
            <div class="content-wrapper">
            <section className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                   
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <h1 className="h4 mb-3 font-weight-normal">Compose Message</h1>
                        {det}
       <Field
        name="to_email"
        label="To"
        component={this.renderField}
        placeholder="Recepient Id"
      />
        <Field
          name="subject"
          label="Subject"
          component={this.renderField}
          placeholder="Subject for Message"
        />

        <Field
          name="message"
          label="Message"
          component={this.renderField1}
          type="textarea"
        />
     
        <button type="submit" className="btn btn-primary">Send</button>
    
      </form>
                    </div>
                </div>
            </div>
            </section>
            </div>
        )
    }
}
function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.to_email) {
      errors.to_email = "Enter Recepient ID";
    }
    if (!values.subject) {
      errors.subject = "Enter Subject";
    }
    if (!values.message) {
      errors.message = "Enter Message";
    }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


  const mapStateToProps = state => (
    {
  rescode: state.newmsg_status
});


export default reduxForm({
    validate,
    form: "NewMessageForm"
  })(connect(mapStateToProps, { newMsg })(NewMessage));

