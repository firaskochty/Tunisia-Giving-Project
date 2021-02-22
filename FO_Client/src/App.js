import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import ProfileOther from "views/examples/ProfileOther.js";
import Register from "views/examples/Register.js";
import FundList from "views/examples/fund_list.js";
import Contact from "views/examples/contact.js";
import FundDetails from "views/examples/Fund_details.js";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Landing {...props} />} />
        <Route
          path="/login-page"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/profil"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route
          path="/profil/:idUser"
          exact
          render={(props) => <ProfileOther {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/fund-list"
          exact
          render={(props) => <FundList {...props} />}
        />
        <Route
          path="/fund/:idFund"
          exact
          render={(props) => <FundDetails {...props} />}
        />
        <Route
          path="/contact"
          exact
          render={(props) => <Contact {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
