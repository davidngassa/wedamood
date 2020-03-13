import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LandingPage from "./shared/pages/LandingPage";
import AuthPage from "./users/pages/AuthPage";
import Home from "./cities/pages/Home";
import Search from "./cities/pages/Search";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Forecast from "./cities/pages/Forecast";
import "./App.css";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/forecast/:cid/" exact>
          <Forecast />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
