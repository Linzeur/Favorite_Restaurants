import React from "react";
import { render, fireEvent } from "@testing-library/react";

import DetailLocation from "../../components/detail-location";
import { UserProvider } from "../../contexts/user";
import { UpdateListProvider } from "../../contexts/update-info";

test("detail-location component to create new location", () => {
  const setModalFn = jest.fn();

  const { getByLabelText, getByText, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <DetailLocation showModalFn={setModalFn} />
      </UpdateListProvider>
    </UserProvider>
  );

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

const location = {
  id: 1,
  name: "Ovalo Miraflores",
  address: "Parque Kennedy",
  district: "Miraflores"
};

test("detail-location component to edit an existing location", async () => {
  const setModalFn = jest.fn();

  const { getByLabelText, getByText, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <DetailLocation locationDetail={location} showModalFn={setModalFn} />
      </UpdateListProvider>
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();

  const modalEditLocation = getByText("Edit Location");
  const modalInputName = getByLabelText("Enter Name");
  const modalInputAddress = getByLabelText("Enter Address");
  const modalInputDistrict = getByLabelText("Enter District");

  expect(modalEditLocation).not.toBeNull();
  expect(modalInputName.value).toBe(location.name);
  expect(modalInputAddress.value).toBe(location.address);
  expect(modalInputDistrict.value).toBe(location.district);
});

test("click in button close", async () => {
  const setModalFn = jest.fn();

  const { getAllByRole, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <DetailLocation locationDetail={location} showModalFn={setModalFn} />
      </UpdateListProvider>
    </UserProvider>
  );

  const buttonClose = getAllByRole("button")[0];

  fireEvent.click(buttonClose);

  expect(setModalFn).toHaveBeenCalledWith(null);
});
