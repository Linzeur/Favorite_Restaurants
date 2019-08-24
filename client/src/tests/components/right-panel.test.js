import React from "react";
import { render, fireEvent } from "@testing-library/react";

import RightPanel from "../../components/right-panel";
import { PositionProvider } from "../../contexts/position";
import { UpdateListProvider } from "../../contexts/update-info";

test("right-panel component", () => {
  const { asFragment } = render(
    <PositionProvider>
      <UpdateListProvider>
        <RightPanel />
      </UpdateListProvider>
    </PositionProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("click in Current Location button", () => {
  const { getAllByRole } = render(
    <PositionProvider>
      <UpdateListProvider>
        <RightPanel />
      </UpdateListProvider>
    </PositionProvider>
  );

  const buttonCurrentLocation = getAllByRole("button")[0];
  fireEvent.click(buttonCurrentLocation);
  const coords = JSON.parse(sessionStorage.getItem("lastCurrentPosition"));

  expect(coords.lat).toBe(-11.9913905);
  expect(coords.lng).toBe(-77.0873197);
});
