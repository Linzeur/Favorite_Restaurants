import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Search from "../../components/search";

const list = [
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
  },
  {
    id: 4,
    name: "Matsuri",
    address: "Avenida Manuel Cipriano Dulanto 1911",
    latitude: "-12.075754",
    longitude: "-77.076761",
    district: "Pueblo Libre"
  },
  {
    id: 56,
    name: "Por Javier prado",
    address: "Javier prado cuadra 8",
    latitude: "-12.092317",
    longitude: "-77.031701",
    district: "San isidro"
  },
  {
    id: 57,
    name: "Mi casas",
    address: "Avenida Huandoyr",
    latitude: "-11.9876429",
    longitude: "-77.0909696",
    district: "Los olivos"
  }
];

test("search component with add button shown", () => {
  const setListFn = jest.fn();

  const { asFragment } = render(
    <Search list={list} listFn={setListFn} showAddButton={true} />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("search component with add button hidden", () => {
  const setListFn = jest.fn();

  const { asFragment } = render(
    <Search list={list} listFn={setListFn} showAddButton={false} />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("call function passed as prop", () => {
  const setListFn = jest.fn();

  const { getByLabelText } = render(
    <Search list={list} listFn={setListFn} showAddButton={true} />
  );

  const inputToSearch = getByLabelText("Search an option");

  fireEvent.change(inputToSearch, { target: { value: "mi" } });

  const listFiltered = list.filter(
    value => value.name.toLowerCase().indexOf("mi") > -1
  );

  expect(setListFn).toHaveBeenCalledWith(listFiltered);
});
