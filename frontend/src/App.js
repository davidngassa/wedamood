import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import LandingPage from "./shared/pages/LandingPage";
import AuthPage from "./users/pages/AuthPage";
import Home from "./cities/pages/Home";
import SearchCity from "./cities/pages/SearchCity";
import MainNavigation from "./shared/Navigation/MainNavigation";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Route path="/search" exact>
          <SearchCity />
        </Route>
        <Redirect to="/home" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>{routes}</Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
