/** @jsx jsx */
import React from "react";
import { render } from "react-dom";
import { jsx, Global } from "@emotion/core";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { UserProvider } from "./contexts/user";
import App from "./app";

const global = {
  body: {
    margin: 0,
    fontFamily: "'Nunito',sans-serif",
    fontSize: "15px",
    background: "#f2f3f5"
  },
  "li, ul, h1, h2, h3, h4": {
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  a: {
    textDecoration: "none",
    color: "inherit"
  }
};

const options = {
  position: "bottom right",
  timeout: 5000,
  offset: "0px",
  transition: "scale"
};

const $root = document.getElementById("root");
render(
  <>
    <Global styles={global} />
    <AlertProvider template={AlertTemplate} {...options}>
      <UserProvider>
        <App />
      </UserProvider>
    </AlertProvider>
  </>,
  $root
);
