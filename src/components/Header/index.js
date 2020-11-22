import React from 'react'
import './style.scss'
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {signOutUserStart} from './../../redux/User/userActions'
// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
// })

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = (props) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="MMUbaba Logo" />
                    </Link>
                </div>

                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/admin">
                                    My Account
                            </Link>
                            </li>
                            <li>
                                <span onClick={() => signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    Dashboard
                            </Link>
                            </li>
                            <li>
                                <Link to="/registration">
                                    Register
                            </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                            </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
};


export default Header
