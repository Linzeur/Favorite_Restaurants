/** @jsx jsx */
import { jsx } from "@emotion/core";

function Button({ styles, ...props }) {
  return (
    <button
      {...props}
      css={{
        width: "100%",
        margin: "0.7rem auto",
        padding: "1rem",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        border: "1px solid currentcolor",
        borderRadius: ".25rem",
        color: "#fff",
        background: "#000",
        transition: "all 200ms ease",
        outline: "0",
        "@media (max-width: 768px)": {
          margin: "0.5rem auto",
          borderRadius: "0.5em",
          boxSizing: "border-box"
        },
        "&:hover": {
          cursor: "pointer",
          background: "#fff",
          color: "#000"
        },
        ...styles
      }}
    />
  );
}

export { Button };
