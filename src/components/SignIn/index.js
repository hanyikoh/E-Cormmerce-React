import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom'
import Button from './../forms/Button/index';
// import { signInWithGoogle} from './../../firebase/utils';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper/index'
import { withRouter } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInUser, signInWithGoogle, resetAllAuthForms} from '../../redux/User/userActions'

const mapState = ({user}) => ({
  signInSuccess: user.signInSuccess
})

const SignIn = (props) => {
  const {signInSuccess} = useSelector(mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if(signInSuccess){
      resetForm();
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signInSuccess])

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   resetForm();
    //   props.history.push('/')
    // } catch (error) {
    //   setErrors([error.message])
    // }
    try{
      dispatch(signInUser({email, password}));
      resetForm()
    }catch(error){

    }
  }

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  }

  const configureAuthWrapper = {
    headline: 'Login'
  }

  return (
    <AuthWrapper {...configureAuthWrapper}>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return (
              <li key={index}>
                {err}
              </li>
            )
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">
            LogIn
                </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="links">
        <Link to="/recovery">
          Reset Password
        </Link>
      </div>
    </AuthWrapper>
  );

}

export default withRouter(SignIn);