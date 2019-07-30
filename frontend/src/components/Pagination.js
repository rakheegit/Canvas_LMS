import React from 'react';
import "./style.css";

class Pagination extends React.Component {

    constructor() {
      super();
      this.state = {
        todos: ['a','b','c','d','e','f','g','h','i','j','k'],
        currentPage: 1,
        todosPerPage: 3
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    render() {
      const { todos, currentPage, todosPerPage } = this.state;

      // Logic for displaying current todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

      const renderTodos = currentTodos.map((todo, index) => {
        return <li key={index}>{todo}</li>;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
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

      return (
        <div>  
        <div class="content-wrapper">
        <section className="content-header">
        <div className="container">
        <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <ul>
            {renderTodos}
          </ul>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
          </div> 
          </div>
          </div>
               </section>
               </div>
           
        </div>
      );
    }
  }
  export default Pagination