import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import './App.css';

// import Nav from "./components/Nav";
import DevDash from "./pages/DevDashboard";
// import Settings from "./pages/Settings";
import UploadNewApp from "./pages/UploadNewApp";
import RegisterApp from "./pages/RegisterApp";
import NoMatch from "./pages/NoMatch";

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      {/* <Nav/> */}
      <Switch>
        <Route exact={exact} path="/" component={DevDash} />
        <Route exact={exact} path="/console" component={DevDash} />
        {/* <Route exact={exact} path="/console/settings" component={Settings} /> */}
        <Route exact={exact} path="/console/register" component={RegisterApp} />
        <Route exact={exact} path="/console/upload" component={UploadNewApp} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
