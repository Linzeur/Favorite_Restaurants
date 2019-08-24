/** @jsx jsx */
import React from "react";
import { createPortal } from "react-dom";
import { jsx } from "@emotion/core";
import { FaPlus } from "react-icons/fa";

import DetailLocation from "./detail-location";

function AddLocation() {
  const [showModal, setShowModal] = React.useState(false);

  const $portal = React.useMemo(() => {
    let $portal = document.getElementById("portal");
    if (!$portal) {
      $portal = document.createElement("div");
      $portal.setAttribute("id", "portal");
      document.body.appendChild($portal);
    }
    return $portal;
  }, []);
  return (
    <>
      <button
        type="button"
        aria-label="Create location"
        css={{
          cursor: "pointer",
          borderRadius: "0.5em",
          border: "none",
          backgroundColor: "#3498DB",
          width: 40,
          color: "white"
        }}
        onClick={() => setShowModal(true)}
      >
        <FaPlus css={{ fontSize: "1.5em" }} />
      </button>
      {showModal &&
        createPortal(<DetailLocation showModalFn={setShowModal} />, $portal)}
    </>
  );
}

export default AddLocation;
