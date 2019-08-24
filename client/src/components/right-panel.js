/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@reach/tabs";

import { Button } from "./ui";
import Spinner from "./spinner";
import ListLocations from "./list-locations";
import { PositionContext } from "../contexts/position";

const ListFavorite = React.lazy(() => import("./list-favorite"));

const buttonStyle = {
  border: `1px solid transparent`,
  outline: "none",
  borderRadius: "4px 4px 0 0",
  marginBottom: "-1px",
  padding: ".75em 1.25em",
  fontSize: "15px",
  cursor: "pointer",
  color: "white",
  backgroundColor: "darkgray",
  width: "50%"
};

function RightPanel() {
  const position = React.useContext(PositionContext);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [optionSelected, setOptionSelected] = React.useState(null);
  const [wasCalledFavorites, setWasCalledFavorites] = React.useState(false);

  const colors = ["#3498DB", "#3498DB"];
  const backgroundColor = colors[tabIndex];

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      currentPosition => {
        position.onChange(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
          true
        );
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div css={{ width: "30%", margin: "0.5em", backgroundColor: "#eaeaea" }}>
      <Button type="button" onClick={handleClick} style={{ padding: "0.5em" }}>
        Current Location
      </Button>
      <Tabs
        onChange={index => {
          setTabIndex(index);
          setWasCalledFavorites(true);
          setOptionSelected(null);
        }}
      >
        <TabList
          css={{
            borderBottom: `1px solid ${backgroundColor}`,
            '[aria-selected="true"]': {
              backgroundColor: backgroundColor,
              borderColor: backgroundColor,
              borderBottomColor: `${backgroundColor}!important`
            }
          }}
        >
          <Tab css={buttonStyle}>My Locations</Tab>
          <Tab css={buttonStyle}>My Favorites</Tab>
        </TabList>
        <TabPanels css={{ paddingBottom: 5 }}>
          <TabPanel css={{ outline: 0 }}>
            <ListLocations
              optionSelected={optionSelected}
              optionSelectedFn={setOptionSelected}
            />
          </TabPanel>
          <TabPanel css={{ outline: 0 }}>
            <React.Suspense fallback={<Spinner />}>
              {wasCalledFavorites && (
                <ListFavorite
                  optionSelected={optionSelected}
                  optionSelectedFn={setOptionSelected}
                />
              )}
            </React.Suspense>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default RightPanel;
