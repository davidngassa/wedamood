import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = props => {
  return (
    <ul class="navlinks">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>

      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
