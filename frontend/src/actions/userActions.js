import axios from "axios";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const UPDATE_PROF = 'UPDATE_PROF';

const ROOT_URL = "/users";

var accessToken = localStorage.getItem('usertoken')



 // Set the AUTH token for any request
 axios.interceptors.request.use(function (config) {
   const token = localStorage.getItem('usertoken');
   config.headers.Authorization =  token ? `Bearer ${token}` : '';
   return config;
 });



export const fetchProfile = () => dispatch => {
 // let accessToken = localStorage.getItem('usertoken')
  console.log("accessToken: " + accessToken)
  axios.get(`${ROOT_URL}/profile`)
    .then(responseData =>
      dispatch({
        type: FETCH_PROFILE,
        payload: responseData
      })
     
    );
};

export const signUp = (values,callback) => dispatch => {
  axios.post(`${ROOT_URL}/signup`, values)
    .then(response =>
      dispatch({
        type: SIGN_UP,
        payload: response.status
      })
    )
    .then(() => callback());
    
};

export const updateProfile = (values,callback) => dispatch => {
  console.log("accessToken: " + accessToken)
 // axios.post(`${ROOT_URL}/profileupdate`,values,{headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}},callback)
 axios.post(`${ROOT_URL}/profile`,values,callback)
    .then(response =>{
      console.log("response status in updprf action : " + response.status + JSON.stringify(response.data))
      dispatch({
        type: UPDATE_PROF,
        payload: response.status
      })}
    )
    .then(() => callback());
    
};

export const signin = (values,callback) => dispatch => {
     //set the with credentials to true
     axios.defaults.withCredentials = true;
axios.post(`${ROOT_URL}/signin`,values)
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log("response status in action : " + response.status + response.data)
      dispatch({
        type: SIGN_IN,
        payload: response.status
      })}
    )
    .then(() => callback());  
};


/*
export function fetchProfile() {
    //middleware call
    //receive response from backend
    const response = axios.get(`${ROOT_URL}/profileget`);
    //Action dispatched
    console.log("Response",response);
    return {
      type: FETCH_PROFILE,
      payload: response
    };
  }
  */
  /*
  export function updateProfile(values, callback) {
    const request = axios
      .post(`${ROOT_URL}/updateProfile`, values)
      .then(() => callback());
  
    return {
      type: UPD_PROFILE,
      payload: request
    };
  }
  */