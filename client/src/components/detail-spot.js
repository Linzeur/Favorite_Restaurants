/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAlert } from "react-alert";

import { UserContext } from "../contexts/user";
import { UpdateListContext } from "../contexts/update-info";
import { getSpot, deleteSpotFavorite } from "../services/spot";
import { createFavorite } from "../services/favorite";
import { Button } from "./ui";
import Spinner from "./spinner";

import {
  sectionStyle,
  formStyle,
  fieldsetStyle,
  labelStyle,
  buttonStyle
} from "../utils/modal-style";

const iconFavoriteStyle = { width: 30, fontSize: "2em", cursor: "pointer" };

const infoStyle = {
  display: "inline-block",
  width: "80%",
  textAlign: "left",
  "@media (max-width: 600px)": {
    width: "calc(80% - 100px)"
  }
};

function DetailSpot({ spotId, showModalFn }) {
  const alert = useAlert();
  const logged = React.useContext(UserContext);
  const updateInfo = React.useContext(UpdateListContext);

  const [spot, setSpot] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [nroFavoriteOthers, setNroFavoriteOthers] = React.useState(null);

  const handleClose = () => {
    showModalFn(null);
  };

  const handleUpdate = spot => {
    const favoriteData = {
      restaurant_id: spot.place_id,
      name: spot.name,
      latitude: spot.lat,
      longitude: spot.lng
    };
    createFavorite(favoriteData)
      .then(response => {
        setSpot(prevState => {
          return { ...prevState, isFavorite: true };
        });
        updateInfo.onChange("favorites");
        if (response.times_favorite)
          setNroFavoriteOthers(response.times_favorite - 1);
      })
      .catch(error => {
        console.log(error);
        if (error.message === "Access denied") logged.onLogout();
        else alert.error("There's a problem during the connection");
      });
  };

  const handleDelete = spotId => {
    deleteSpotFavorite(spotId)
      .then(response => {
        setSpot(prevState => {
          return { ...prevState, isFavorite: false };
        });
        updateInfo.onChange("favorites");
      })
      .catch(error => {
        console.log(error);
        if (error.message === "Access denied") logged.onLogout();
        else alert.error("There's a problem during the connection");
      });
  };

  React.useEffect(() => {
    getSpot(spotId)
      .then(response => {
        setSpot(response);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        if (error.message === "Access denied") logged.onLogout();
        else alert.error("There's a problem during the connection");
      });
  }, []);

  return (
    <section css={sectionStyle}>
      <form css={formStyle}>
        <div css={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Details</h2>
          {!loading &&
            (spot.isFavorite ? (
              <FaHeart
                aria-label="Button with icon indicate spot is favorite for you"
                role="button"
                css={iconFavoriteStyle}
                onClick={() => {
                  handleDelete(spot.place_id);
                }}
              />
            ) : (
              <FaRegHeart
                aria-label="Button with icon indicate spot is not favorite for you"
                role="button"
                css={iconFavoriteStyle}
                onClick={() => {
                  handleUpdate(spot);
                }}
              />
            ))}
        </div>
        <hr />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {[
              ["Name", "name"],
              ["Address", "vicinity"],
              ["Telephone", "formatted_phone_number"],
              ["Rating", "rating"]
            ].map(value => (
              <fieldset css={fieldsetStyle} key={value[0]}>
                <label css={labelStyle}>{value[0]}</label>
                <div css={infoStyle}>
                  <label>
                    {spot[value[1]] ? spot[value[1]] : "Not Information"}
                  </label>
                </div>
              </fieldset>
            ))}
            <fieldset css={fieldsetStyle} key="schedule">
              <label css={labelStyle}>Schedule</label>
              <div css={infoStyle}>
                {spot["opening_hours"] ? (
                  <div css={{ display: "flex", flexDirection: "column" }}>
                    {spot["opening_hours"]["weekday_text"].map(
                      (value, index) => (
                        <label key={index} css={{ margin: "5px 0" }}>
                          {value}
                        </label>
                      )
                    )}
                  </div>
                ) : (
                  <label>Not Information about schedule</label>
                )}
              </div>
            </fieldset>
          </>
        )}

        <fieldset css={fieldsetStyle}>
          <Button type="button" css={buttonStyle} onClick={handleClose}>
            Close
          </Button>
        </fieldset>

        {nroFavoriteOthers && (
          <label
            css={{
              fontSize: "1.25em",
              color: "#01015a",
              fontWeight: "bold",
              display: "block",
              textAlign: "center"
            }}
          >
            This spot is favorite for you and {nroFavoriteOthers} more
          </label>
        )}
      </form>
    </section>
  );
}

export default DetailSpot;
