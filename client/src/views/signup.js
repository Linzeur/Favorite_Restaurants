/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { useAlert } from "react-alert";

import { Button } from "../components/ui";
import { createUser } from "../services/user";

import {
  containerStyle,
  formStyle,
  h1Style,
  labelStyle,
  inputStyle,
  errorStyle
} from "../utils/sign-in-up-style";
import useForm from "../utils/useForm";

function SignUp() {
  const alert = useAlert();
  const inputName = useForm();
  const inputEmail = useForm();
  const inputPassword = useForm();

  const [action, setAction] = React.useState("Sign Up");
  const [error, setError] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setAction("Loading...");
    const userData = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value
    };
    createUser(userData)
      .then(response => {
        alert.success("User was created");
        navigate("/login");
      })
      .catch(response => {
        setAction("Sign Up");
        setError(response.message);
      });
  }

  return (
    <div css={containerStyle}>
      <form css={formStyle} onSubmit={handleSubmit}>
        <h1 css={h1Style}>CREATE AN ACCOUNT</h1>

        <label css={labelStyle} htmlFor="email">
          Name
        </label>
        <input
          css={inputStyle}
          aria-label="Enter your name"
          type="name"
          name="name"
          id="name"
          placeholder="Enter your name"
          {...inputName}
          required
        />
        <br />

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
          {...inputPassword}
          required
        />
        <br />

        <Button
          type="submit"
          css={{ margin: "1em 0" }}
          aria-label="Sign up user"
        >
          {action}
        </Button>
        <br />
        <label css={{ textAlign: "right" }}>
          <a href="/login">Go to Login</a>
        </label>
        <br />
        {error && (
          <div
            aria-label="Error messages during signing up user"
            css={errorStyle}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
