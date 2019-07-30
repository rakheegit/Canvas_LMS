import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
class SubmissionViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
  //    assn_id:'',
  //   user_email:'',
     assn_rec:{},
     rescode:0
    }

  }

  componentWillMount(){
    console.log("params " + JSON.stringify(this.props.match.params))

    const { user_email,assn_id,course_id } = this.props.match.params
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
             let assnr = JSON.stringify(response.data)
             this.setState({
              assn_rec : response.data
      
          });
          console.log("first " + JSON.stringify(assnr))
          console.log("first2 " + JSON.stringify(this.state.assn_rec))
             console.log("path " + JSON.stringify(this.state.assn_rec.user_file))
             console.log("path1" + this.state.assn_rec.user_file)
             console.log("c " + JSON.stringify(this.state.assn_rec.course_id))
             console.log("c1 " + this.state.assn_rec.course_id)
         //update the state with the response data
      
       

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
  
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }
 
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }
 
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }
 
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }
 
  render() {
/*
    let f1 =  this.state.assn_rec.map(assn => { return assn.user_file })
    let c1 = this.state.assn_rec.map(assn => { return assn.course_id })
*/
console.log("this.state.rescode: " + this.state.rescode)
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
 //   console.log("filename1 " +this.state.assn_rec.user_file + " " + f1 + " " + c1)
    console.log("filename2 " + JSON.stringify(this.state.assn_rec.user_file))
  /*  var file = ''
    file = 'http://localhost:3001/'+`${this.state.assn_rec.user_file}`
    console.log("filename a " + file)
    let newfile =''
    newfile = file
    console.log("filename b " + newfile)
    */
    let render1 = ''
    if(typeof(this.state.assn_rec.user_file)==="undefined"){
   
      console.log("undefined")
      }
      else
      render1=  <div>
       <Link to={`/dashboard/Grade/${this.state.assn_rec.course_id}` } onClick={this._onLinkClick}><button class="btn btn-primary">Back</button></Link>
      <PDF
      file={this.state.assn_rec.user_file}
        onDocumentComplete={this.onDocumentComplete}
        page={this.state.page}
      />
      {pagination}
    </div>

    return (
        <div>  
        <div class="content-wrapper">
        <section className="content-header">
        <div className="container">
        <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
     {render1}
      </div> 
      </div>
      </div>
           </section>
           </div>
       
    </div>
    )
  }
}
 
export default SubmissionViewer;