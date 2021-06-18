import React from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter } from "react-router-dom";
import Startpage from './pages/Startpage';
import Selectpage from './pages/Selectpage'
import Samplepage from './pages/Samplepage';
import Reviewpage from './pages/ReviewPage';
import Loginpage from './pages/admin/loginPage';
import Managepage from './pages/admin/manageMenuPage';
import SampleManagementpage from './pages/admin/sample/adminSamplePage';
import SampleEditpage from './pages/admin/sample/sampleEditPage';
import TaxiManagementpage from './pages/admin/taxi/taxiListPage';
import CreateTaxipage from './pages/admin/taxi/taxiCreatePage';
import TaxiInfopage from './pages/admin/taxi/taxiInfoPage';
import TaxiEditpage from './pages/admin/taxi/taxiEditPage';

function App({location}) {
  return (
      <Switch>
        <Route path='/' component={Startpage} exact={true}/>
        <Route path='/selectsample' component={Selectpage}/>
        <Route path='/userinfo' component={Samplepage}/>
        <Route path='/review' component={Reviewpage}/>
        <Route path='/coffee/login' component={Loginpage}/>
        <Route path='/coffee/menu' component={Managepage} exact={true}/>
        <Route path='/coffee/menu/sample' component={SampleManagementpage} exact={true}/>
        <Route path='/coffee/menu/sample/:sampleId' component={SampleEditpage} />
        <Route path='/coffee/menu/taxi' component={TaxiManagementpage} exact={true} />
        <Route path='/coffee/menu/taxi/create' component={CreateTaxipage} />
        <Route path='/coffee/menu/taxi/:taxiId' component={TaxiInfopage} exact={true} />
        <Route path='/coffee/menu/taxi/:taxiId/edit' component={TaxiEditpage} />
      </Switch>
  );
}

export default withRouter(App);
