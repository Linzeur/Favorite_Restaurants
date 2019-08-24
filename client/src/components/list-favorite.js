/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaHeart, FaMinus } from "react-icons/fa";
import { useAlert } from "react-alert";

import { listFavorites, deleteFavorite } from "../services/favorite";
import { PositionContext } from "../contexts/position";
import { UpdateListContext } from "../contexts/update-info";
import { UserContext } from "../contexts/user";
import Search from "./search";
import Footer from "./footer-list";
import Spinner from "./spinner";

import {
  optionStyles,
  optionSelectedStyles,
  noResultsStyles,
  infoStyle,
  buttonGeneralStyle
} from "../utils/list-style";

const buttonDeleteStyle = {
  ...buttonGeneralStyle,
  backgroundColor: "red"
};

function ListFavorite({ optionSelected, optionSelectedFn }) {
  const alert = useAlert();
  const logged = React.useContext(UserContext);
  const position = React.useContext(PositionContext);
  const updateInfo = React.useContext(UpdateListContext);

  const [list, setList] = React.useState([]);
  const [listTemp, setListTemp] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleClick = favorite => {
    optionSelectedFn(favorite.id);
    position.onChange(+favorite.latitude, +favorite.longitude, false);
  };

  const handleDelete = favoriteId => {
    deleteFavorite(favoriteId)
      .then(response => {
        const index = list.findIndex(favorite => favorite.id === favoriteId);
        setList(prevState => {
          prevState.splice(index, 1);
          return [...prevState];
        });
        updateInfo.onChange("favorites");
        alert.success("Spot favorite was deleted");
      })
      .catch(error => {
        console.log(error);
        if (error.message === "Access denied") logged.onLogout();
        else alert.error("There's a problem during the connection");
      });
  };

  React.useEffect(() => {
    listFavorites()
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
  }, [updateInfo.favorites]);

  return (
    <>
      <Search list={list} listFn={setListTemp} showAddButton={false} />
      {loading ? (
        <Spinner />
      ) : (
        <ul css={{ height: 300, overflowY: "auto" }}>
          {listTemp.length > 0 ? (
            listTemp.map(favorite => (
              <li
                key={favorite.id}
                css={{ display: "flex", alignItems: "center" }}
              >
                <div
                  aria-label="Element Favorite"
                  role="button"
                  css={
                    optionSelected === favorite.id
                      ? optionSelectedStyles
                      : optionStyles
                  }
                  onClick={() => {
                    handleClick(favorite);
                  }}
                >
                  <FaHeart css={{ fontSize: "1.75em", width: 30 }} />
                  <div css={infoStyle}>
                    <span>{favorite.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Delete favorite restaurant"
                  css={buttonDeleteStyle}
                  onClick={() => {
                    handleDelete(favorite.id);
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
      <Footer nroResult={listTemp.length} nameElem={"favorites"} />
    </>
  );
}

export default ListFavorite;
