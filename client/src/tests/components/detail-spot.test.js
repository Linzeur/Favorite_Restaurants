import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import DetailSpot from "../../components/detail-spot";
import { UserProvider } from "../../contexts/user";
import { UpdateListProvider } from "../../contexts/update-info";

const spot = {
  place_id: "ChIJw42ff3DOBZERfN4MyMcqh5U",
  name: "Curayacu Querida Comidas Tipicas",
  vicinity: "Avenida Santa Rosa 1561, San Martín de Porres",
  lat: -11.9876734,
  lng: -77.09368529999999,
  formatted_phone_number: null,
  rating: 4.7,
  opening_hours: null,
  isFavorite: false
};

test("detail-spot component", async () => {
  fetch.mockResponseOnce(JSON.stringify(spot));
  const setModalFn = jest.fn();

  const { getByText, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <DetailSpot spotId={spot.place_id} showModalFn={setModalFn} />
      </UpdateListProvider>
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();

  const modalDetailSpot = getByText("Details");
  expect(modalDetailSpot).not.toBeNull();

  await wait(() => {});

  expect(asFragment()).toMatchSnapshot();
  const modalLabelName = getByText(spot.name);
  const modalLabelAddress = getByText(spot.vicinity);
  const modalLabelTelephone = getByText("Not Information");
  const modalLabelRating = getByText(spot.rating.toString());
  const modalLabelSchedule = getByText("Not Information about schedule");

  expect(modalLabelName).not.toBeNull();
  expect(modalLabelAddress).not.toBeNull();
  expect(modalLabelTelephone).not.toBeNull();
  expect(modalLabelRating).not.toBeNull();
  expect(modalLabelSchedule).not.toBeNull();
});

test("click in button close", () => {
  fetch.mockResponseOnce(JSON.stringify(spot));
  const setModalFn = jest.fn();

  const { getAllByRole, asFragment } = render(
    <UserProvider>
      <UpdateListProvider>
        <DetailSpot spotId={spot.place_id} showModalFn={setModalFn} />
      </UpdateListProvider>
    </UserProvider>
  );

  const buttonClose = getAllByRole("button")[0];

  fireEvent.click(buttonClose);

  expect(setModalFn).toHaveBeenCalledWith(null);
});
