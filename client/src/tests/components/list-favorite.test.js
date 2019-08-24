import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import ListFavorites from "../../components/list-favorite";
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

const listFavorites = [
  {
    id: 1,
    restaurant_id: "ChIJpSBYQ2TOBZERrK59vkz3v9g",
    name: "La Familia",
    latitude: "-11.9913905",
    longitude: "-77.0873197"
  },
  {
    id: 2,
    restaurant_id: "ChIJyTFGS4XPBZER3KOQZ5MtZEk",
    name: "PIZZERIA FAMILY VEGA",
    latitude: "-11.986539",
    longitude: "-77.0886132"
  },
  {
    id: 4,
    restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
    name: "Alphonse Bar",
    latitude: "-12.0917299",
    longitude: "-77.0248756"
  }
];

test("list-favorite component cosuming API", async () => {
  localStorage.setItem("user", JSON.stringify(user));
  fetch.mockResponseOnce(JSON.stringify(listFavorites));
  const setOptionSelectedFn = jest.fn();

  const { getAllByLabelText, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <UpdateListContext.Consumer>
          {updateInfo => (
            <ListFavorites optionSelectedFn={setOptionSelectedFn} />
          )}
        </UpdateListContext.Consumer>
      </UpdateListProvider>
    </UserProvider>
  );

  let favorites;
  await wait(() => {
    favorites = getAllByLabelText("Element Favorite");
  });

  expect(asFragment()).toMatchSnapshot();

  expect(favorites.length).toBe(3);
});

test("select an option", async () => {
  localStorage.setItem("user", JSON.stringify(user));
  fetch.mockResponseOnce(JSON.stringify(listFavorites));
  const setOptionSelectedFn = jest.fn();

  const { getAllByLabelText, asFragment } = render(
    <UserProvider>
      <PositionProvider>
        <UpdateListProvider>
          <UpdateListContext.Consumer>
            {updateInfo => (
              <ListFavorites optionSelectedFn={setOptionSelectedFn} />
            )}
          </UpdateListContext.Consumer>
        </UpdateListProvider>
      </PositionProvider>
    </UserProvider>
  );

  let favorites;
  await wait(() => {
    favorites = getAllByLabelText("Element Favorite");
  });

  expect(asFragment()).toMatchSnapshot();

  expect(favorites.length).toBe(3);

  fireEvent.click(favorites[0]);

  expect(setOptionSelectedFn).toHaveBeenCalledWith(listFavorites[0].id);
});
