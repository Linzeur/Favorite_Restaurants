/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";

import { Button } from "../components/ui";
import { login } from "../services/session";
import { UserContext } from "../contexts/user";

import {
  containerStyle,
  formStyle,
  h1Style,
  labelStyle,
  inputStyle,
  errorStyle
} from "../utils/sign-in-up-style";
import useForm from "../utils/useForm";

function Login() {
  const inputEmail = useForm();
  const inputPassword = useForm();

  const logged = React.useContext(UserContext);
  const [action, setAction] = React.useState("Log In");
  const [error, setError] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setAction("Loading...");
    login({ email: inputEmail.value, password: inputPassword.value })
      .then(response => {
        logged.onLogin(response);
        navigate("/");
      })
      .catch(error => {
        setAction("Log In");
        setError(error.message);
      });
  }

  return (
    <div css={containerStyle}>
      <form css={formStyle} onSubmit={handleSubmit}>
        <h1 css={h1Style}>LOGIN</h1>

        <label css={labelStyle} htmlFor="email">
          Email
        </label>
        <input
          css={inputStyle}
          aria-label="Enter your email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          {...inputEmail}
          required
        />
        <br />

        <label css={labelStyle} htmlFor="password">
          Password
        </label>
        <input
          css={inputStyle}
          aria-label="Enter your password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="off"
          {...inputPassword}
          required
        />
        <br />

        <Button
          type="submit"
          css={{ margin: "1em 0" }}
          aria-label="Sign In User"
        >
          {action}
        </Button>
        <br />
        <label css={{ textAlign: "right" }}>
          <a href="/signup">Go to Sign up</a>
        </label>
        <br />
        {error && (
          <div
            aria-label="Error messages during signing in user"
            css={errorStyle}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
