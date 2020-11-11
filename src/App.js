import React from 'react'
import './default.scss'
import { Route, Switch } from 'react-router-dom'
import Header from "./components/Header"
import Homepage from './pages/Homepage'
import Registration from './pages/Registration/index'
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

function App() {

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
          <MainLayout>
            <Registration />
          </MainLayout>} />
      </Switch>
      {/* Switch will only render the route that match first */}
    </div>
  );
}

export default App;
