import _ from "lodash";
import { CREATE_COURSE } from "../actions/courseActions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 

      case CREATE_COURSE:
      console.log("create course status " + action.payload)
      return  {
        createcourse_status: action.payload
      }

    default:
      return state;
  }
}

