import React from "react";

import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";

const NavLinks = props => {
  return (
    <div className="header-right">
      <NavLink to="/">Home</NavLink>

      <NavLink to="/">Logout</NavLink>

      <NavLink to="/search">
        <FiSearch />
      </NavLink>

      <NavLink to="/search">
        <GoLightBulb />
      </NavLink>
    </div>
  );
};

export default NavLinks;
