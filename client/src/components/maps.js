/** @jsx jsx */
import React from "react";
import { createPortal } from "react-dom";
import { jsx } from "@emotion/core";
import { useAlert } from "react-alert";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import DetailSpot from "./detail-spot";
import { PositionContext } from "../contexts/position";
import { UserContext } from "../contexts/user";
import { UpdateListContext } from "../contexts/update-info";
import { listSpots } from "../services/spot";
import Spinner from "./spinner";

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 48px)",
  width: "70vw"
};

function Maps() {
  const alert = useAlert();
  const logged = React.useContext(UserContext);
  const position = React.useContext(PositionContext);
  const updateInfo = React.useContext(UpdateListContext);

  const [listRestaurants, setListRestaurants] = React.useState([]);
  const [restaurantSelected, setRestaurantSelected] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleClick = placeId => {
    setRestaurantSelected(placeId);
  };

  React.useEffect(() => {
    if (position.callAPI) {
      if (position.latitude !== 0) {
        setLoading(true);
        listSpots(position.latitude, position.longitude)
          .then(response => {
            setListRestaurants(response);
            setLoading(false);
            updateInfo.onChange("locations");
          })
          .catch(error => {
            console.log(error);
            if (error.message === "Access denied") logged.onLogout();
            else alert.error("There's a problem during the connection");
          });
      }
    }
  }, [position.latitude, position.longitude, position.callAPI]);

  const GoogleMapContainer = withGoogleMap(props => {
    const currentPosition = {
      lat: props.position.latitude,
      lng: props.position.longitude
    };
    const $portal = document.getElementById("portal");
    return (
      <>
        {loading ? (
          <Spinner
            styles={{
              margin: "auto auto",
              position: "fixed",
              left: 0,
              right: "30%",
              top: "50%",
              bottom: 0
            }}
          />
        ) : (
          <GoogleMap defaultCenter={currentPosition} defaultZoom={16}>
            {props.position.callAPI ? (
              <Marker
                key="currentPosition"
                position={currentPosition}
                icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              >
                <InfoWindow>
                  <h4>You are here</h4>
                </InfoWindow>
              </Marker>
            ) : (
              currentPosition.lat !== 0 && (
                <Marker
                  key="favoritePosition"
                  position={currentPosition}
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                >
                  <InfoWindow>
                    <h4>The spot is here</h4>
                  </InfoWindow>
                </Marker>
              )
            )}
            {props.listMarkers.map(spot => {
              if (
                spot.lat !== currentPosition.lat &&
                spot.lng !== currentPosition.lng
              )
                return (
                  <Marker
                    key={spot.place_id}
                    position={{ lat: spot.lat, lng: spot.lng }}
                    onClick={() => {
                      handleClick(spot.place_id);
                    }}
                  />
                );
              return null;
            })}
          </GoogleMap>
        )}
        {props.markerSelected.spotId &&
          createPortal(<DetailSpot {...props.markerSelected} />, $portal)}
      </>
    );
  });

  return (
    <GoogleMapContainer
      containerElement={<div css={container} />}
      mapElement={<div style={{ height: "100%", width: "100%" }} />}
      listMarkers={listRestaurants}
      position={position}
      markerSelected={{
        spotId: restaurantSelected,
        showModalFn: setRestaurantSelected
      }}
    />
  );
}

export default Maps;
