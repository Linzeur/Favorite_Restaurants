/** @jsx jsx */
import React from "react";
import { jsx, keyframes } from "@emotion/core";

function Spinner({ styles }) {
  const bounce = keyframes`
    0%, 80%, 100% { 
      transform: scale(0);
    } 40% { 
      transform: scale(1.0);
    }
  `;

  const common = {
    width: 16,
    height: 16,
    marginRight: 2,
    backgroundColor: "rgba(106, 106, 106, 0.5)",
    borderRadius: "100%",
    display: "inline-block",
    animation: `${bounce} 1.4s infinite ease-in-out both`
  };

  return (
    <div
      css={{
        margin: "50px auto",
        width: "70px",
        textAlign: "center",
        ...styles
      }}
    >
      <div css={{ ...common, animationDelay: "-0.32s" }} />
      <div css={{ ...common, animationDelay: "-0.16s" }} />
      <div css={{ ...common }} />
    </div>
  );
}

export default Spinner;
