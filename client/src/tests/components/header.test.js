import React from "react";
import { render, getNodeText } from "@testing-library/react";

import Header from "../../components/header";
import { UserProvider } from "../../contexts/user";

const user = {
  name: "User Test",
  email: "test@test.com"
};

test("header component", () => {
  localStorage.setItem("user", JSON.stringify(user));

  const { asFragment } = render(
    <UserProvider>
      <Header title={"Titulo nuevo"} />
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Valid username and title shown ", () => {
  localStorage.setItem("user", JSON.stringify(user));

  const { getByLabelText } = render(
    <UserProvider>
      <Header title={"Titulo nuevo"} />
    </UserProvider>
  );

  const spanTitle = getByLabelText("Title of header for this page");
  const spanUserName = getByLabelText("Username");

  expect(getNodeText(spanTitle)).toBe("Titulo nuevo");
  expect(getNodeText(spanUserName)).toBe("User Test");
});
