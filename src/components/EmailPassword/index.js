import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput';
import Button from './../forms/Button'
import { auth } from './../../firebase/utils'

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;
            const config = {
                url: 'http://localhost:3000/login'
                //the page we want to send to user afte rthey reset their password
            }
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login')
                })
                .catch(() => {
                    const err = ["Email Not Found"];
                    this.setState({
                        errors: err
                    })
                })
        } catch (error) {

        }
    }

    render() {
        const { email, errors } = this.state;
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

                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
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
}

export default withRouter(EmailPassword)
