import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = props => {
  return (
    <MainHeader>
      <h2 class="main-navigation__title">
        <Link to="/">Logo</Link>
      </h2>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
