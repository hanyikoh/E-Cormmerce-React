import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import FormInput from './../forms/FormInput'
import Button from './../forms/Button'
import { auth, handleUserProfile } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper/index'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

const Signup = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([])
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            const err = ["Password Dont\'t match"];
            setErrors(err)
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            resetForm();
            props.history.push('/')
        } catch (error) {
            console.log(error)
        }
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

export default withRouter(Signup)
