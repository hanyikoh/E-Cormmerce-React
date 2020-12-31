import formTypes from './formTypes'

const INITIAL_STATE = {
    email: '',
    issue: ''
}

const formReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case formTypes.SET_FORMS:
            return {
                ...state,
                forms: action.payload
            }
        default:
            return state;
    }
}

export default formReducer;