/** @jsx jsx */
import { jsx } from "@emotion/core";

function Footer({ nroResult, nameElem }) {
  return (
    <div
      css={{
        display: "flex",
        margin: "0.5em",
        padding: "0.25em",
        fontSize: "1.25em"
      }}
    >
      <span css={{ width: 75 }}>Results:</span>
      <span css={{ width: "calc(100% - 80px)", fontWeight: "bold" }}>
        {nroResult} {nameElem}
      </span>
    </div>
  );
}

export default Footer;
