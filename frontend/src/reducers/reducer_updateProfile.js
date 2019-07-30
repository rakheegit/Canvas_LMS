import _ from "lodash";
import { UPDATE_PROF} from "../actions/userActions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 

      case UPDATE_PROF:
      console.log("prof update status " + action.payload)
      return  {
        status: action.payload
      }

    default:
      return state;
  }
}

