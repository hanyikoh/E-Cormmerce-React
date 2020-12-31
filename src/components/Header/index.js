import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router-dom';
import './style.scss'
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from './../../redux/User/userActions'
import { selectCartItemsCount } from '../../redux/Cart/cartSelectors';
import useWindowDimensions from '../../customHooks/useWindowDimensions';
// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
// })


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
})


const Header = (props) => {
    const [open, setOpen] = useState(false)
    // const windows = useWindowDimensions();
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

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

                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                    <span onClick={() => setOpen(!open)} >
                        <i className="fas fa-bars menu-btn"></i>
                    </span>
                </nav>

                <div className="callToActions">
                    <ul style={{ transform: open ? "translateX(0px)" : ""}}>
                        {currentUser && [
                            <li>
                                <Link to="/cart">
                                    Your Cart ({totalNumCartItems})
                                </Link>
                            </li>,
                            <li>
                                <Link to="/admin">
                                    My Account
                            </Link>
                            </li>,
                            <li>
                                <span onClick={() => signOut()}>
                                    LogOut
                                </span>
                            </li>
                        ]}
                        {/* we are returning an array here, using comar to seperate it (returning two element) */}

                        {!currentUser && [
                            <li>
                                <Link to="/dashboard">
                                    Dashboard
                            </Link>
                            </li>,
                            <li>
                                <Link to="/registration">
                                    Register
                            </Link>
                            </li>,
                            <li>
                                <Link to="/login">
                                    Login
                            </Link>
                            </li>
                        ]}
                    </ul>
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
};


export default Header
