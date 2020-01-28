import React from "react";

import "./MainHeader.css";

const MainHeader = props => {
  return <header class="main-header">{props.children}</header>;
};

export default MainHeader;
