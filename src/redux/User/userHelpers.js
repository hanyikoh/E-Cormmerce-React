import {auth} from './../../firebase/utils'

export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login'
        //the page we want to send to user afte rthey reset their password
      }
    return new Promise((resolve, reject) => {
      auth.sendPasswordResetEmail(email, config)
      .then(() => {
        // props.history.push('/login')
        //the history is passed from withRoute
        resolve()
      })
      .catch(() => {
        const err = ["Email Not Found"];
        reject(err)
      })
    })
}