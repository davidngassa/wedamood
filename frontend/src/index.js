import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./laptop-hd.css";
import "./tablet-large.css";
import "./tablet-small.css";
import "./mobile.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./fonts/Poppins-Regular.ttf";
import "./fonts/Poppins-Light.ttf";
import "./fonts/Poppins-Bold.ttf";
import "./fonts/Poppins-ExtraBold.ttf";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
