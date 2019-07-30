import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import "./style.css";
import "./testcourse.css";

class Search extends Component {
    constructor() {
        super()
        this.state  = {
            search_type: '',
            search_string: '',
            course_filter: '0',
            courseList: [],
            currentPage: 1,
            itemsPerPage: 7,
            course_dep:'CMPE'
          
          };

        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeRadio = this.onChangeRadio.bind(this)
       this.onSubmit = this.onSubmit.bind(this)
       this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    onChangeText (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeRadio (e) {
        this.setState({  search_type : e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()


    if (this.state.search_type === "Course Term") {
        
        console.log("search type: " + this.state.search_string)
    axios.get('/course/coursesearchbyterm',{
        params:{course_term: this.state.search_string,course_filter:this.state.course_filter,
            course_dep:this.state.course_dep}
    })
    .then((response) => {
    //update the state with the response data
 
    this.setState({
        courseList : response.data
      
    });
})
    .catch(err => {
        console.log(err)
    })
    

}
if (this.state.search_type === "Course ID") {
    console.log("search type: " + this.state.search_string)
    axios.get('/course/coursesearchbyid',{
        params: {course_id: this.state.search_string}
    })
    .then((response) => {
    //update the state with the response data
 console.log("respo: " + JSON.stringify(response.data))
    this.setState({
        courseList : response.data
      
    });
})
    .catch(err => {
        console.log(err)
    })
    

}
if (this.state.search_type === "Course Name") {
    console.log("search type: " + this.state.search_string)
    axios.get('/course/coursesearchbyname',{
        params:{course_name: this.state.search_string}
    })
    .then((response) => {
    //update the state with the response data
 
    this.setState({
        courseList : response.data
      
    });
})
    .catch(err => {
        console.log(err)
    })
    

}
}


    render () {

        const { courseList, currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
     //   const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
     const currentTodos = courseList.slice(indexOfFirstTodo, indexOfLastTodo);
//     console.log("currentTodos: " + JSON.stringify(currentTodos))

  //      const renderTodos = currentTodos.map((todo, index) => {
  //        return <li  key={index}>{todo}</li>;
   //     });

        let  renderTodos =  currentTodos.map((crs,index) => {
        
            return(
              <tr key={index}>
              <td>{crs.course_id}</td>
              <td>{crs.course_dep}</td>
              <td>{crs.course_term}</td>
              <td>{crs.course_name}</td>
              </tr>
            )
            
        })
  
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(courseList.length / itemsPerPage); i++) {
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

        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/signin"/>
        }
let details = [];
        details = this.state.courseList.map(course => {

            return(
                <tr>
                    <td>{course.course_id}</td>
                    <td>{course.course_dep}</td>
                    <td>{course.course_term}</td>
                    <td>{course.course_name}</td>
                </tr>
              
            )

        })


        return (
           <div>
           <div class="content-wrapper">
           {redirectVar}
           <section className="content-header">
           <div className="container">
               <div className="row">
                   <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h4 mb-3 font-weight-normal">Select Search Type</h1>
                          
                            <div style={{"display": "inline-block"}} className="form-group">
                                <label>
                                <input type="radio"
                                    name="search_type" 
                                    value="Course Term"
                                    onChange={this.onChangeRadio}
                                     checked={this.state.search_type === "Course Term"}
                                />{" "}
                                Term
                                </label>{" "}
                            </div>
                            <div  className="form-group">
                            <label htmlFor="user_name">Course ID > than</label>
                            <input type="text" style={{"padding":"20","width":"20%","display": "inline-block"}}
                                className="form-control"
                                name="course_filter"
                                value={this.state.course_filter}
                                onChange={this.onChangeText}
                            /> {" "}    
                            <select  style={{"float": "right","padding":"20","width":"40%","display": "inline-block"}} 
                            className="form-control" name="course_dep"  
                            value={this.state.course_dep}  onChange={this.onChangeText}>
                        
                            <option value="CMPE">CMPE</option>
                            <option value="EEE">EEE</option>
                            <option value="CE">CE</option>
                            <option value="IE">IE</option>
                          </select>
                        </div>
        
                            <div className="form-group">
                                <label>
                                <input type="radio"
                                    name="search_type"
                                    value="Course ID"
                                    onChange={this.onChangeRadio}
                                    checked={this.state.search_type === "Course ID"}
                                />{" "}
                                Course ID
                                </label>{" "}
                            </div>
                            <div className="form-group">
                            <label>
                            <input type="radio"
                                name="search_type"
                                value="Course Name"
                                onChange={this.onChangeRadio}
                                checked={this.state.search_type === "Course Name"}
                            />{" "}
                            Course Name
                            </label>{" "}
                        </div>

                        <div className="form-group">
                        <label htmlFor="user_name">Enter value for the Search type selected above</label>
                        <input type="text"
                            className="form-control"
                            name="search_string"
                            placeholder="Enter value"
                            value={this.state.search_string}
                            onChange={this.onChangeText}
                        />
                    </div>

                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Search
                            </button>
                            <br/>
                         
                        </form>
                   
          
            <div class="container">
             
                        <table  style={{"top":"460px","left":"20px"}} class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Department</th>
                                    <th>Term</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {renderTodos}
                            </tbody>
                        </table>
                        <div style={{"margin-top":"420px"}}>
                        <ul>

                        </ul>
                      <ul id="page-numbers">
                        {renderPageNumbers}
                      </ul>
                      </div>
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

export default Search
