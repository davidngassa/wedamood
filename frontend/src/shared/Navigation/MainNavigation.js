import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = props => {
  const auth = useContext(AuthContext);

  return (
    <MainHeader>
      <Link className="logo" to={auth.isLoggedIn ? "/home" : "/"}>
        wedamood
      </Link>

      <NavLinks />
    </MainHeader>
  );
};

export default MainNavigation;
