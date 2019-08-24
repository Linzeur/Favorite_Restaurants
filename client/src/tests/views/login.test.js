import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import Login from "../../views/login";
import { UserProvider } from "../../contexts/user";

test("Login component view", () => {
  const { asFragment } = render(
    <UserProvider>
      <Login />
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

const userLogged = { name: "Usuario Test", email: "test@test.com" };

test("log in a valid user", async () => {
  fetch.mockResponseOnce(JSON.stringify(userLogged));
  const { getByLabelText, getByRole } = render(
    <UserProvider>
      <Login />
    </UserProvider>
  );

  const inputEmail = getByLabelText("Enter your email");
  const inputPassword = getByLabelText("Enter your password");
  const buttonLogin = getByRole("button");

  fireEvent.change(inputEmail, {
    target: { value: "test@test.com" }
  });

  fireEvent.change(inputPassword, {
    target: { value: "123456" }
  });

  fireEvent.submit(buttonLogin);

  await wait(() => {});

  const user = JSON.parse(localStorage.getItem("user"));
  expect(user.name).toBe(userLogged.name);
  expect(user.email).toBe(userLogged.email);
});
