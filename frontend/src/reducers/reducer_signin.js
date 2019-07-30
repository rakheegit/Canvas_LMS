import _ from "lodash";
import { SIGN_IN} from "../actions/userActions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 

      case SIGN_IN:
      console.log("signin status " + action.payload)
      return  {
        signin_status: action.payload
      }

    default:
      return state;
  }
}

