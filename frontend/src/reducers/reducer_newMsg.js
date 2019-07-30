import _ from "lodash";
import {WRITE_MSG} from "../actions/msgActions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 

      case WRITE_MSG:
      console.log("new msg status " + action.payload)
      return  {
        newmsg_status: action.payload
      }

    default:
      return state;
  }
}

