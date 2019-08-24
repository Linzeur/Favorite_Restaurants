/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useAlert } from "react-alert";

import { UserContext } from "../contexts/user";
import { UpdateListContext } from "../contexts/update-info";
import { createLocation, updateLocation } from "../services/location";
import { Button } from "./ui";

import {
  sectionStyle,
  formStyle,
  fieldsetStyle,
  labelStyle,
  buttonStyle
} from "../utils/modal-style";

const inputStyle = {
  background: "none",
  border: "1px solid #eaeaea",
  borderRadius: ".25rem",
  boxSizing: "border-box",
  fontSize: "1rem",
  padding: ".5rem",
  color: "#333",
  width: "70%",
  "&:focus": {
    outline: "none",
    borderBottomColor: "black"
  }
};

function DetailLocation({ locationDetail, showModalFn }) {
  const alert = useAlert();
  const logged = React.useContext(UserContext);
  const updateInfo = React.useContext(UpdateListContext);
  const [location, setLocation] = React.useState(
    locationDetail || {
      name: "",
      address: "",
      district: ""
    }
  );

  const handleClose = () => {
    showModalFn(null);
  };

  const handleSave = event => {
    event.preventDefault();
    const locationData = {
      name: location.name,
      address: location.address,
      district: location.district
    };

    if (!locationDetail) {
      const lastPosition = JSON.parse(
        sessionStorage.getItem("lastCurrentPosition")
      );
      locationData["latitude"] = lastPosition.lat;
      locationData["longitude"] = lastPosition.lng;
      createLocation(locationData)
        .then(response => {
          updateInfo.onChange("locations");
          alert.success("New Location was created");
          showModalFn(false);
        })
        .catch(error => {
          console.log(error);
          if (error.message === "Access denied") logged.onLogout();
          else alert.error("There's a problem during the connection");
        });
    } else
      updateLocation(location.id, locationData)
        .then(response => {
          updateInfo.onChange("locations");
          alert.success("Location was updated");
          showModalFn(false);
        })
        .catch(error => {
          console.log(error);
          if (error.message === "Access denied") logged.onLogout();
          else alert.error("There's a problem during the connection");
        });
  };

  const handleChange = (e, key) => {
    setLocation({ ...location, [key]: e.target.value });
  };

  return (
    <section css={sectionStyle}>
      <form css={formStyle} onSubmit={handleSave}>
        <div css={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{locationDetail ? "Edit" : "New"} Location</h2>
        </div>
        <hr />

        {[
          ["Name", "name"],
          ["Address", "address"],
          ["District", "district"]
        ].map(value => (
          <fieldset css={fieldsetStyle} key={value[0]}>
            <label css={labelStyle}>{value[0]}</label>
            <input
              type="text"
              css={inputStyle}
              autoComplete="off"
              id={value[0]}
              name={value[0]}
              placeholder={`Enter ${value[0]}`}
              aria-label={`Enter ${value[0]}`}
              value={location[value[1]]}
              onChange={event => handleChange(event, value[1])}
              required
            />
          </fieldset>
        ))}

        <fieldset css={fieldsetStyle}>
          <Button type="button" css={buttonStyle} onClick={handleClose}>
            Cancel
          </Button>
          <Button css={buttonStyle}>Save</Button>
        </fieldset>
      </form>
    </section>
  );
}

export default DetailLocation;
