import React from "react";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.2em"
  },
  name: {
    fontSize: "1.5em"
  },
  description: {
    fontSize: "1.1em"
  }
};
/*
const ListBody = ({ course_id, course_name, course_dep, course_term }) => (
  <div style={styles.wrapper}>
  <span style={styles.course_dep}>{course_term} {course_dep} {course_id}</span>
    <span style={styles.course_name}>{course_name}</span>
  </div>
);
*/
const ListBody = ({ course_id, course_dep, course_name }) => (
  <div style={styles.wrapper}>
  
  <span style={styles.name}> {course_dep} {course_id}</span>
  <span style={styles.description}>{course_name}</span>
  </div>
);
export default ListBody;
