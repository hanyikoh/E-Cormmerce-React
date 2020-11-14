import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils'
import userTypes from './userTypes'

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        })
    } catch (err) {
        console.log(err)
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ['Password Don\'t match']
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        })
        return
    }

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        await handleUserProfile(user, { displayName })
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })
    } catch (error) {

    }
}

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login'
        //the page we want to send to user afte rthey reset their password
    }
    try {

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                // props.history.push('/login')
                //the history is passed from withRoute
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                const err = ["Email Not Found"];
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
            })
    } catch (error) {
        console.log(error)
    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: true
                })
            })
    } catch (err) {

    }
} 