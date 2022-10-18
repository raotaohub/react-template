import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";
import "./styles.scss";
import "./styles.less";

const mountNode = document.getElementById("app");

ReactDOM.createRoot(mountNode!).render(
  <React.StrictMode>
    <HashRouter>
      <App name="Jane" />
    </HashRouter>
  </React.StrictMode>
);
