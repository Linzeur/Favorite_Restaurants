/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Router, Redirect } from "@reach/router";

import { UserContext } from "./contexts/user";
import Login from "./views/login";
import Home from "./views/home";
import SignUp from "./views/signup";

function App() {
  const logged = React.useContext(UserContext);

  return (
    <Router>
      {logged.data ? (
        <Redirect from="/login" to="/" noThrow />
      ) : (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup" && (
          <Redirect from={window.location.pathname} to="/login" noThrow />
        )
      )}
      <Login path="/login" />
      <SignUp path="/signup" />
      <Home path="/" />
    </Router>
  );
}

export default App;
