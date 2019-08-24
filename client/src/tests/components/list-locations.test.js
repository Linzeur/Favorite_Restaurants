import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import ListLocations from "../../components/list-locations";
import { UserProvider } from "../../contexts/user";
import { PositionProvider } from "../../contexts/position";
import {
  UpdateListProvider,
  UpdateListContext
} from "../../contexts/update-info";

const user = {
  name: "User Test",
  email: "test@test.com"
};

const listLocations = [
  {
    id: 1,
    name: "Ovalo Miraflores",
    address: "Parque Kennedy",
    latitude: "-12.119109",
    longitude: "-77.029313",
    district: "Miraflores"
  },
  {
    id: 2,
    name: "Cercanias de Larcomar",
    address: "Armendariz",
    latitude: "-12.134923",
    longitude: "-77.025859",
    district: "Miraflores"
  },
  {
    id: 3,
    name: "Casa de mi amigo Paul",
    address: "Calle Jorge Chavez",
    latitude: "-12.121387",
    longitude: "-77.036953",
    district: "Miraflores"
  }
];

test("list-location component without consuming API", () => {
  const setOptionSelectedFn = jest.fn();

  const { asFragment } = render(
    <UpdateListProvider>
      <ListLocations optionSelectedFn={setOptionSelectedFn} />
    </UpdateListProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("list-location component consuming API", async () => {
  localStorage.setItem("user", JSON.stringify(user));
  fetch.mockResponseOnce(JSON.stringify(listLocations));
  const setOptionSelectedFn = jest.fn();

  const { asFragment, getAllByLabelText } = render(
    <UserProvider>
      <UpdateListProvider>
        <UpdateListContext.Consumer>
          {updateInfo => {
            if (updateInfo.locations === 0) {
              updateInfo.onChange("locations");
            }
            return <ListLocations optionSelectedFn={setOptionSelectedFn} />;
          }}
        </UpdateListContext.Consumer>
      </UpdateListProvider>
    </UserProvider>
  );

  let locations;
  await wait(() => {
    locations = getAllByLabelText("Element location");
  });

  expect(asFragment()).toMatchSnapshot();

  expect(locations.length).toBe(3);
});

test("select an option", async () => {
  localStorage.setItem("user", JSON.stringify(user));
  fetch.mockResponseOnce(JSON.stringify(listLocations));
  const setOptionSelectedFn = jest.fn();

  const { getAllByLabelText, asFragment } = render(
    <UserProvider>
      <PositionProvider>
        <UpdateListProvider>
          <UpdateListContext.Consumer>
            {updateInfo => {
              if (updateInfo.locations === 0) {
                updateInfo.onChange("locations");
              }
              return <ListLocations optionSelectedFn={setOptionSelectedFn} />;
            }}
          </UpdateListContext.Consumer>
        </UpdateListProvider>
      </PositionProvider>
    </UserProvider>
  );

  let locations;
  await wait(() => {
    locations = getAllByLabelText("Element location");
  });

  fireEvent.click(locations[0]);

  expect(setOptionSelectedFn).toHaveBeenCalledWith(listLocations[0].id);
});

test("show modal to edit location", async () => {
  localStorage.setItem("user", JSON.stringify(user));
  fetch.mockResponseOnce(JSON.stringify(listLocations));
  const setOptionSelectedFn = jest.fn();

  const { getAllByLabelText, getByText, getByLabelText, asFragment } = render(
    <UserProvider>
      <PositionProvider>
        <UpdateListProvider>
          <UpdateListContext.Consumer>
            {updateInfo => {
              if (updateInfo.locations === 0) {
                updateInfo.onChange("locations");
              }
              return <ListLocations optionSelectedFn={setOptionSelectedFn} />;
            }}
          </UpdateListContext.Consumer>
        </UpdateListProvider>
      </PositionProvider>
    </UserProvider>
  );

  let editButtons;
  await wait(() => {
    editButtons = getAllByLabelText("Edit location");
  });

  fireEvent.click(editButtons[0]);

  expect(asFragment()).toMatchSnapshot();

  const modalEditLocation = getByText("Edit Location");
  const modalInputName = getByLabelText("Enter Name");
  const modalInputAddress = getByLabelText("Enter Address");
  const modalInputDistrict = getByLabelText("Enter District");

  expect(modalEditLocation).not.toBeNull();
  expect(modalInputName.value).toBe(listLocations[0].name);
  expect(modalInputAddress.value).toBe(listLocations[0].address);
  expect(modalInputDistrict.value).toBe(listLocations[0].district);
});
