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

##Sign In with Email & Password

###1. Set up a InputForm component to get for user input
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

###2. Get user password & email
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

###3. Sign in with Auth Function
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

