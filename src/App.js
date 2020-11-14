import React, { useState, useEffect } from 'react'
import './default.scss'
import { Route, Switch, Redirect } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Registration from './pages/Registration/index'
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/index'
import { auth, handleUserProfile } from './firebase/utils'
import Recovery from './pages/Recovery/index'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './redux/User/userActions'
import Dashboard from './pages/Dashboard'
import WithAuth from './hoc/WithAuth'


const App = (props) => {
  // const { setCurrentUser, currentUser } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      //from onAuthStateChanged, firebase will return a function that's why authListrener is 
      //declared as function here 
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
        })
      };

      //If use click logout then the page will reload and run this function againb
      //then this dispatch will again be called and return null
      dispatch(setCurrentUser(userAuth)) //this will return null
    });

    return () => {
      authListener();
    };
  }, [])

  //use component willunmount to unsuscribe the auth object to prevent memory leaks

  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" component={Homepage}></Route>
          <Route path="/registration" component={Registration}></Route> */}
        <Route exact path="/" render={() =>
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>} />

        <Route path="/registration" render={() =>(
            <MainLayout >
              <Registration />
            </MainLayout>)} />

        <Route path="/login" render={() => (
            <MainLayout>
              <Login />
            </MainLayout>)} />

        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>)} />

        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
      </Switch>
      {/* Switch will only render the route that match first */}
    </div>
  );
}
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

export default App;
