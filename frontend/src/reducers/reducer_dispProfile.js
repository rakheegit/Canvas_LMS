import _ from "lodash";
import { FETCH_PROFILE} from "../actions/userActions";

const initialState = {
  items: []
}

//Reducer listening to different action types
//initial state is {}
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case FETCH_PROFILE:
      return {
        ...state,
       items: action.payload
      }

    default:
      return state;
  }
}

