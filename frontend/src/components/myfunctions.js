import axios from 'axios'


export const crtAnc = newAnc => {
    return axios
        .post('/course/announcement', {
            course_id: newAnc.course_id,
            title: newAnc.title,
            content: newAnc.content
        })
        .then(data => console.log(data)) //for checking response that was sent back from post mthod signup
        .catch(err => console.log(err))
}



export const crtQuiz = newQuiz => {
    return axios
        .post('/course/createquiz', {
            course_id: newQuiz.course_id,
            title: newQuiz.title,
            question: newQuiz.question,
            optionA: newQuiz.optionA,
            optionB: newQuiz.optionB,
            optionC: newQuiz.optionC,
            optionD: newQuiz.optionD,
            answer: newQuiz.answer,
            due_date: newQuiz.due_date
        })
        .then(data => console.log(data)) //for checking response that was sent back from post mthod signup
        .catch(err => console.log(err))
}


export const createCourse = newCourse => {
    return axios
        .post('/course/coursecreate', {
            course_id: newCourse.course_id,
        course_dep: newCourse.course_dep,
        course_name: newCourse.course_name,
        course_term: newCourse.course_term,
        course_desc: newCourse.course_desc,
        course_room: newCourse.course_room,
        course_cap: newCourse.course_cap,
        course_wl_cap: newCourse.course_wl_cap
        
        })
        .then(data => console.log(data)) //for checking response that was sent back from post mthod signup
        .catch(err => console.log(err))
}

/*
export const updateProfile = userProf => {
   
    return axios
        .post('/profileupdate',formData,config)
     
  //          user_name: userProf.user_name,
       //     user_email: userProf.user_email,
   //         user_phone: userProf.user_phone,
   //         user_about_me: userProf.user_about_me,
    //        user_city: userProf.user_city,
     //       user_country: userProf.user_country,
    //        user_company: userProf.user_company,
    //        user_school: userProf.user_school,
    //        user_hometown: userProf.user_hometown,
     //       user_language: userProf.user_language,
    //        user_gender: userProf.user_gender,
    //        user_photo: userProf.user_photo
    //        })
        .then(data => console.log("printing response" + JSON.stringify(data))) //for checking response that was sent back from post mthod signup
        .catch(err => console.log(err))
}

*/
export const signin = user => {
    return axios
        .post('/signin', {
            user_email: user.user_email,
            user_password: user.user_password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
        })
}

export const enroll = course => {
    return axios
        .post('/courseenrollment', {
            course_id: course.course_id 
        })
        .then(response => {
            console.log("printing response" + JSON.stringify(response))
        })
        
        .catch(err => console.log(err))
}

export const drop = course => {
    return axios
        .post('/courseenrollment', {
            course_id: course.course_id 
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
}


