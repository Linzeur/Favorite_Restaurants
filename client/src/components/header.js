/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaUser } from "react-icons/fa";

import LogOut from "./logout";
import { UserContext } from "../contexts/user";

function Header({ title }) {
  const currentUser = React.useContext(UserContext).data;

  return (
    <div
      css={{
        display: "flex",
        backgroundColor: "#3498db",
        height: "48px",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 0 0 0.5em",
        border: "none"
      }}
    >
      <span
        aria-label="Title of header for this page"
        css={{
          alignSelf: "center",
          fontSize: "1.5em",
          fontWeight: "bold",
          color: "white"
        }}
      >
        {title}
      </span>
      <div css={{ display: "flex" }}>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            height: "2rem",
            fontSize: "2em",
            padding: "0.5rem",
            border: "none"
          }}
        >
          <FaUser />
          <span
            aria-label="Username"
            css={{ fontSize: "0.5em", marginLeft: "0.5rem", width: "80px" }}
          >
            {currentUser.name}
          </span>
        </div>
        <LogOut />
      </div>
    </div>
  );
}

export default Header;
