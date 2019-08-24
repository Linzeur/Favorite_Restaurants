/** @jsx jsx */
import React from "react";
import { createPortal } from "react-dom";
import { jsx } from "@emotion/core";
import { FaSearchLocation, FaMinus, FaEdit } from "react-icons/fa";
import { useAlert } from "react-alert";

import { listLocations, deleteLocation } from "../services/location";
import { PositionContext } from "../contexts/position";
import { UpdateListContext } from "../contexts/update-info";
import { UserContext } from "../contexts/user";
import Search from "./search";
import Footer from "./footer-list";
import DetailLocation from "./detail-location";
import Spinner from "./spinner";

import {
  optionStyles,
  optionSelectedStyles,
  noResultsStyles,
  infoStyle,
  buttonGeneralStyle
} from "../utils/list-style";

const buttonEditStyle = {
  ...buttonGeneralStyle,
  backgroundColor: "#034268"
};

const buttonDeleteStyle = {
  ...buttonGeneralStyle,
  backgroundColor: "red"
};

function ListLocations({ optionSelected, optionSelectedFn }) {
  const alert = useAlert();
  const logged = React.useContext(UserContext);
  const position = React.useContext(PositionContext);
  const updateInfo = React.useContext(UpdateListContext);

  const [list, setList] = React.useState([]);
  const [listTemp, setListTemp] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [optionEdit, setOptionEdit] = React.useState(null);

  const $portal = React.useMemo(() => {
    let $portal = document.getElementById("portal");
    if (!$portal) {
      $portal = document.createElement("div");
      $portal.setAttribute("id", "portal");
      document.body.appendChild($portal);
    }
    return $portal;
  }, []);

  const handleClick = location => {
    optionSelectedFn(location.id);
    position.onChange(+location.latitude, +location.longitude, true);
  };

  const handleEdit = location => {
    const data = {
      id: location.id,
      name: location.name,
      address: location.address,
      district: location.district
    };
    setOptionEdit(data);
  };

  const handleDelete = locationId => {
    deleteLocation(locationId)
      .then(response => {
        const index = list.findIndex(location => location.id === locationId);
        setList(prevState => {
          prevState.splice(index, 1);
          return [...prevState];
        });
        updateInfo.onChange("locations");
        alert.success("Location was deleted");
      })
      .catch(error => {
        console.log(error);
        if (error.message === "Access denied") logged.onLogout();
        else alert.error("There's a problem during the connection");
      });
  };

  React.useEffect(() => {
    if (updateInfo.locations > 0) {
      listLocations()
        .then(response => {
          setList(response);
          setListTemp(response);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          if (error.message === "Access denied") logged.onLogout();
          else alert.error("There's a problem during the connection");
        });
    }
  }, [updateInfo.locations]);

  return (
    <>
      <Search list={list} listFn={setListTemp} showAddButton={true} />
      {loading ? (
        <Spinner />
      ) : (
        <ul css={{ height: 300, overflowY: "auto" }}>
          {listTemp.length > 0 ? (
            listTemp.map(location => (
              <li
                key={location.id}
                css={{ display: "flex", alignItems: "center" }}
              >
                <div
                  aria-label="Element location"
                  role="button"
                  css={
                    optionSelected === location.id
                      ? optionSelectedStyles
                      : optionStyles
                  }
                  onClick={() => {
                    handleClick(location);
                  }}
                >
                  <FaSearchLocation css={{ fontSize: "1.75em", width: 40 }} />
                  <div css={infoStyle}>
                    <span>{location.name}</span>
                    <span css={{ fontSize: "0.75em", fontWeight: "bold" }}>
                      {location.district}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Edit location"
                  css={buttonEditStyle}
                  onClick={() => {
                    handleEdit(location);
                  }}
                >
                  <FaEdit css={{ fontSize: "1.5em" }} />
                </button>
                <button
                  type="button"
                  aria-label="Delete location"
                  css={buttonDeleteStyle}
                  onClick={() => {
                    handleDelete(location.id);
                  }}
                >
                  <FaMinus css={{ fontSize: "1.5em" }} />
                </button>
              </li>
            ))
          ) : (
            <li css={noResultsStyles}>No results found</li>
          )}
        </ul>
      )}
      <Footer nroResult={listTemp.length} nameElem={"locations"} />
      {optionEdit &&
        createPortal(
          <DetailLocation
            locationDetail={optionEdit}
            showModalFn={setOptionEdit}
          />,
          $portal
        )}
    </>
  );
}

export default ListLocations;
