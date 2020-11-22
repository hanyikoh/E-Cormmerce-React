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

//components
import AdminToolbar from './components/AdminToolbar'

import { useDispatch, useSelector } from 'react-redux'
import { checkUserSession } from './redux/User/userActions'
import Dashboard from './pages/Dashboard'
import WithAuth from './hoc/WithAuth'
import Admin from './pages/Admin'
import WithAdminAuth from './hoc/withAdminAuth'
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Search from './pages/Search'

const App = (props) => {
  // const { setCurrentUser, currentUser } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  //use component willunmount to unsuscribe the auth object to prevent memory leaks

  return (
    <div className="App">
      <AdminToolbar/>
      <Switch>
        {/* <Route exact path="/" component={Homepage}></Route>
          <Route path="/registration" component={Registration}></Route> */}
        <Route exact path="/" render={() =>
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>} />
        <Route path="/search" render={()=>(
          <MainLayout>
            <Search/>
          </MainLayout>
        )}/>
        <Route path="/registration" render={() => (
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
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
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
