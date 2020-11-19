import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from './../../redux/User/userActions'
import {signUpUserStart} from './../../redux/User/userActions'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'
import AuthWrapper from './../AuthWrapper/index'

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const Signup = props => {
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState)
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/')
        }
    }, [currentUser])

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr)
        }
    }, [userErr])

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([])
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        dispatch(signUpUserStart(
            {
            displayName, 
            email, 
            password, 
            confirmPassword
            }));
    }

    // const { displayName, email, password, confirmPassword, errors } = this.props
    const configureAuthWrapper = {
        headline: 'Sign Up'
    }

    return (
        <AuthWrapper {...configureAuthWrapper}>
            <div className="formWrap">
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

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />
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
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit">
                        Register
                        </Button>
                </form>
            </div>
        </AuthWrapper>

    )
}

export default Signup
