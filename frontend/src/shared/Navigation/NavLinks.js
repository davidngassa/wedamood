import React, { useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <div className="header-right">
      {auth.isLoggedIn && <NavLink to="/home">Home</NavLink>}
      {auth.isLoggedIn && <NavLink to="/auth">Logout</NavLink>}
      {auth.isLoggedIn && (
        <NavLink to="/search">
          <FiSearch />
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/">
          <GoLightBulb />
        </NavLink>
      )}
    </div>
  );
};

export default NavLinks;
