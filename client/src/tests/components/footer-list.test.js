import React from "react";
import { render } from "@testing-library/react";

import Footer from "../../components/footer-list";

test("footer-list component", () => {
  const { asFragment } = render(
    <Footer nroResult={5} nameElem={"locations"} />
  );

  expect(asFragment()).toMatchSnapshot();
});
