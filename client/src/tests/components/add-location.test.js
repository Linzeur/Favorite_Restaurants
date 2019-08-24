import React from "react";
import { render, fireEvent } from "@testing-library/react";

import AddLocation from "../../components/add-location";

test("add-location component", () => {
  const { asFragment } = render(<AddLocation />);

  expect(asFragment()).toMatchSnapshot();
});

test("show modal to edit location", async () => {
  const { getByLabelText, getByText, asFragment } = render(<AddLocation />);

  const buttonAddLocation = getByLabelText("Create location");

  fireEvent.click(buttonAddLocation);

  expect(asFragment()).toMatchSnapshot();

  const modalEditLocation = getByText("New Location");
  const modalInputName = getByLabelText("Enter Name");
  const modalInputAddress = getByLabelText("Enter Address");
  const modalInputDistrict = getByLabelText("Enter District");

  expect(modalEditLocation).not.toBeNull();
  expect(modalInputName.value).toBe("");
  expect(modalInputAddress.value).toBe("");
  expect(modalInputDistrict.value).toBe("");
});
