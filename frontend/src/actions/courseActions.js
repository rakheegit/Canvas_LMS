import axios from "axios";

export const CREATE_COURSE = 'CREATE_COURSE';


const ROOT_URL = "/course";

var accessToken = localStorage.getItem('usertoken')



 // Set the AUTH token for any request
 axios.interceptors.request.use(function (config) {
   const token = localStorage.getItem('usertoken');
   config.headers.Authorization =  token ? `Bearer ${token}` : '';
   return config;
 });

export const createCourse  = (values,callback) => dispatch => {
 // let accessToken = localStorage.getItem('usertoken')
  console.log("accessToken: " + accessToken)
  axios.post(`${ROOT_URL}/coursecreate`, values)
    .then(response =>
      dispatch({
        type: CREATE_COURSE,
        payload: response.status
      })
      )
      .then(() => callback());
      
  };



