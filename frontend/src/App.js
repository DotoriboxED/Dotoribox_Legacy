import React from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter } from "react-router-dom";
import Startpage from './pages/Startpage';
import Selectpage from './pages/Selectpage'
import Samplepage from './pages/Samplepage';
import Reviewpage from './pages/ReviewPage';

function App({location}) {
  return (
      <Switch>
        <Route path='/' component={Startpage} exact={true}/>
        <Route path='/selectsample' component={Selectpage}/>
        <Route path='/userinfo' component={Samplepage}/>
        <Route path='/review' component={Reviewpage}/>
      </Switch>
  );
}

export default withRouter(App);
