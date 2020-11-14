import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput';
import Button from './../forms/Button'
import { auth } from './../../firebase/utils'
import {resetPassword,resetAllAuthForms} from './../../redux/User/userActions'
import {useSelector, useDispatch} from 'react-redux'

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = (props) => {
    const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForms())
            props.history.push('/login');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPassword({email}))

        // try {
        //     const config = {
        //         url: 'http://localhost:3000/login'
        //         //the page we want to send to user afte rthey reset their password
        //     }

        //     await auth.sendPasswordResetEmail(email, config)
        //         .then(() => {
        //             props.history.push('/login')
        //             //the history is passed from withRoute
        //         })
        //         .catch(() => {
        //             const err = ["Email Not Found"];
        //             setErrors(err)
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const configureAuthWrapper = {
        headline: "Email Password"
    }

    return (
        <AuthWrapper {...configureAuthWrapper}>
            <div className="formWrap">

                {
                    errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }

                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e=>setEmail(e.target.value)}
                    >

                    </FormInput>

                    <Button type="submit">
                        Email Password
                        </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(EmailPassword)
