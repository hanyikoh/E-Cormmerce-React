import React, { Component } from 'react'
import './default.scss'
import { Route, Switch, Redirect } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Registration from './pages/Registration/index'
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/index'
import {auth, handleUserProfile} from './firebase/utils'
import Recovery from './pages/Recovery/index'

import {connect} from 'react-redux'
import {setCurrentUser} from './redux/User/uerActions'


class App extends Component {

  authListener = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          // this.setState({
          //   currentUser:{
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // })
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      };

      setCurrentUser(userAuth) //this will return null
    })
  }

  componentWillUnmount(){
    this.authListener()
  }
  //use component willunmount to unsuscribe the auth object to prevent memory leaks

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Homepage}></Route>
          <Route path="/registration" component={Registration}></Route> */}
          <Route exact path="/" render={() =>
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>} />

          <Route path="/registration" render={() =>
          currentUser?<Redirect to="/"/>:(
            <MainLayout >
              <Registration />
            </MainLayout>)} />

          <Route path="/login" render={() =>
           currentUser?<Redirect to="/" />: (
            <MainLayout>
              <Login />
            </MainLayout> )} />

          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery/>
            </MainLayout>)}/>
        </Switch>
        {/* Switch will only render the route that match first */}
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
