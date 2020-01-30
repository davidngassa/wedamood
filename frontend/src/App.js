import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Cities from "./cities/pages/Cities";
import SearchCity from "./cities/pages/SearchCity";
import MainNavigation from "./shared/Navigation/MainNavigation";
import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/home" exact>
          <Cities />
        </Route>
        <Route path="/search" exact>
          <SearchCity />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
