import _ from "lodash";
import { SIGN_UP} from "../actions/userActions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 

      case SIGN_UP:
      console.log("signup status " + action.payload)
      return  {
        signup_status: action.payload
      }

    default:
      return state;
  }
}

