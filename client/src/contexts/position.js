import React from "react";

const PositionContext = React.createContext();

function PositionProvider(props) {
  const [position, setPosition] = React.useState([0, 0, false]);

  React.useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(({ coords }) => {
      setPosition([coords.latitude, coords.longitude, true]);
      sessionStorage.setItem(
        "lastCurrentPosition",
        JSON.stringify({ lat: coords.latitude, lng: coords.longitude })
      );
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [setPosition]);

  const value = {
    latitude: position[0],
    longitude: position[1],
    callAPI: position[2],
    onChange: (lat, lng, callAPI) => {
      setPosition([lat, lng, callAPI]);
    }
  };

  return <PositionContext.Provider value={value} {...props} />;
}

export { PositionProvider, PositionContext };
