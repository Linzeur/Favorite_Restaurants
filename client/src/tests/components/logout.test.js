import React from "react";
import { render } from "@testing-library/react";

import Logout from "../../components/logout";

test("logout component", () => {
  const { asFragment } = render(<Logout />);

  expect(asFragment()).toMatchSnapshot();
});
