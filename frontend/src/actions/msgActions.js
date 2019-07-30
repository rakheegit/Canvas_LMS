import axios from "axios";

export const WRITE_MSG = 'WRITE_MSG';


const ROOT_URL = "/users";

var accessToken = localStorage.getItem('usertoken')


 // Set the AUTH token for any request
 axios.interceptors.request.use(function (config) {
   const token = localStorage.getItem('usertoken');
   config.headers.Authorization =  token ? `Bearer ${token}` : '';
   return config;
 });


export const newMsg = (values,callback) => dispatch => {
  console.log("accessToken: " + accessToken)
  axios.post(`${ROOT_URL}/messages`, values)
    .then(response =>
      dispatch({
        type: WRITE_MSG,
        payload: response.status
      })
    )
    .then(() => callback());
    
};

