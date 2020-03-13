import React, { useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    auth.logout();
  };

  return (
    <div className="header-right">
      {auth.isLoggedIn && <NavLink to="/home">Home</NavLink>}
      {auth.isLoggedIn && (
        <NavLink to="/" onClick={logoutHandler}>
          Logout
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/search">
          <FiSearch />
        </NavLink>
      )}
    </div>
  );
};

export default NavLinks;
