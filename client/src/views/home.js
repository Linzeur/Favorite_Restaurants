/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import Map from "../components/maps";
import Header from "../components/header";
import RightPanel from "../components/right-panel";
import { PositionProvider } from "../contexts/position";
import { UpdateListProvider } from "../contexts/update-info";

function Home() {
  return (
    <PositionProvider>
      <Header title="Flavor Route" />
      <main css={{ height: "100%", display: "flex", backgroundColor: "white" }}>
        <UpdateListProvider>
          <Map />
          <RightPanel />
        </UpdateListProvider>
      </main>
    </PositionProvider>
  );
}

export default Home;
