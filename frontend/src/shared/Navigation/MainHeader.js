import React from "react";

import "./Header.css";

const MainHeader = props => {
  return <header className="header">{props.children}</header>;
};

export default MainHeader;
