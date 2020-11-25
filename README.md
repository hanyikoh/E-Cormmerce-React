# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## Google Authentication & Login
### 1. Install Firebase
''' npm install firebase

### 2. Copy over the firebase config
export const firebaseConfig = {
    apiKey: "A2i2ie2oehodhod3bk3boi3oqwg3",

    authDomain: "ecommerce2321321.com,

    databaseURL: "httpswdqwewq.com",

    projectId: "ecomm22221232",

    storageBucket: "ecom323213",

    messagingSenderId: "5232132132",

    appId: "1:563321321321213rewd2321e",

    measurementId: "G-52321r21213"

  };

### 3. Initialize the App with above config
firebase.initializeApp(firebaseConfig);

### 4 Sign In with Google Configuration
export const auth = firebase.auth();

export const firestore = firebase.firestore();


const GoogleProvider = new firebase.auth.GoogleAuthProvider();

GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);



## Sign In with Email & Password

### 1. Set up a InputForm component to get for user input
const FormInput = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input type="formInput" onChange={handleChange} {...otherProps}/>
        </div>
    )
}


### 2. Get user password & email
const initialState = {
  email: '',
  password: ''
}

class SignIn extends Component {
    constructor(props){
      super(props);
      this.state = {
        ...initialState
      }

      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
      const {name, value} = e.target;
      this.setState({
        [name]: value
      })
    }
<form onSubmit={this.handleSubmit}>

                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  handleChange={this.handleChange}
                />
                ....


### 3. Sign in with Auth Function
handleSubmit = async (e) => {
      e.preventDefault();
      const {email, password} = this.state;

      try{
        await auth.signInWithEmailAndPassword(email, password);
        this.setState({
          ...initialState
        })
      }catch(error){
        
      }
    }

### Redux
## 1. Install Redux
``` npm install redux react-redux redux-logger```
we use redux-logger as our middle ware so that we can view all the process and actions in our console
## 2. Set Up a Redux Store
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

export const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
## 3. Create User Action
const userTypes = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

export default userTypes
## 4. Create Dispatcher
import userTypes from './userTypes'

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload:user
})
## 5. Create Reducer
import userTypes from './userTypes'

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
## 6.Connect it with other components
```const { currentUser } = this.props;
... Other
... Codes
... Place Here
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

## ewqqw

