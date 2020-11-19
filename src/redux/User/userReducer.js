import userTypes from './userTypes'

const INITIAL_STATE = {
    currentUser: null,
    userErr:[],
    // signInSuccess: false,
    // signUpSuccess: false,
    // signUpError: [],
    resetPasswordSuccess: false,
    // resetPasswordError: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr:[]
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            }
        case userTypes.USER_ERROR:
            return{
                ...state,
                userErr: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;