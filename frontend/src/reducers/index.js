import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProfileReducer from "./reducer_dispProfile";
import SignUpReducer from "./reducer_signUp";
import SignInReducer from "./reducer_signin";
import NewMsgReducer from "./reducer_newMsg";
import CourseCreateReducer from "./reducer_createCourse";

const rootReducer = combineReducers({
   profile: ProfileReducer,
  form: formReducer,
  signup_status: SignUpReducer,
  signin_status: SignInReducer,
  newmsg_status: NewMsgReducer,
  createcourse_status: CourseCreateReducer,
});

export default rootReducer;
