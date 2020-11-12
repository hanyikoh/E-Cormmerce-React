import React, { Component } from 'react'
import './default.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from "./components/Header"
import Homepage from './pages/Homepage'
import Registration from './pages/Registration/index'
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/index'
import {auth, handleUserProfile} from './firebase/utils'

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount(){
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      };

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount(){
    this.authListener()
  }
  //use component willunmount to unsuscribe the auth object to prevent memory leaks

  render() {
    const {currentUser} = this.state;

    return (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Homepage}></Route>
          <Route path="/registration" component={Registration}></Route> */}
          <Route exact path="/" render={() =>
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>} />
          <Route path="/registration" render={() =>
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>} />
          <Route path="/login" render={() =>
           currentUser?<Redirect to="/" />: (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout> )} />
        </Switch>
        {/* Switch will only render the route that match first */}
      </div>
    );
  }
}

export default App;
