import React from "react";
import { render } from "@testing-library/react";

import Spinner from "../../components/spinner";

test("spinner component", () => {
  const { asFragment } = render(<Spinner />);

  expect(asFragment()).toMatchSnapshot();
});
