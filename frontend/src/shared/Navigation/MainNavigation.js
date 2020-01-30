import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = props => {
  return (
    <MainHeader>
      <Link className="logo" to="/home">
        wedamooD
      </Link>

      <NavLinks />
    </MainHeader>
  );
};

export default MainNavigation;
