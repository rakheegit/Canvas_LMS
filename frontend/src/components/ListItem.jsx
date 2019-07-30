import React, { Component } from "react";
import ListBody from "./ListBody";

const styles = {
  li: {
    display: "flex",
    justifyContent: "flex-start",
    background: "white",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#707070",
    marginBottom: "1em",
    marginRight: "1em",
  //  cursor: "pointer",
    width: "19em",
    cursor: "move",
  },
  leftWall: color => ({
    width: "1.5em",
    backgroundColor: color
  })
};

export default class ListItem extends Component {
//  onDragStart = e => {
//    e.dataTransfer.effectAllowed = "move";
   // e.dataTransfer.setData("text/html", e.target.parentNode);
   // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
//  };
  render() {
    return (
      <li 
      style={styles.li}
     // onClick={() => this.props.handleOnClick(this.props.id)}
    >
      <div  style={styles.leftWall(this.props.completed ? "red" : "gray")} />
      <ListBody  course_dep={this.props.course_dep} course_id={this.props.course_id} course_name={this.props.course_name} />
   
    </li>
   /*   <li
        style={styles.li}
        onClick={() => this.props.handleOnClick(this.props.id)}
      >
        <div style={styles.leftWall(this.props.completed ? "red" : "gray")} />
        <ListBody course_id={this.props.course_id} course_name={this.props.course_name} course_dep={this.props.course_dep} course_term={this.props.course_term}/>
      </li>
   */
    );
  }
}
