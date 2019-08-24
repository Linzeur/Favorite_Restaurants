const generalStyles = {
  display: "flex",
  alignItems: "center",
  margin: "0.5em",
  padding: "0.25em",
  width: "100%"
};

const optionStyles = {
  ...generalStyles,
  "&:hover": {
    backgroundColor: "#3498DB",
    color: "white",
    borderRadius: "0.5em",
    cursor: "pointer"
  }
};

const optionSelectedStyles = {
  ...generalStyles,
  backgroundColor: "#3498DB",
  color: "white",
  borderRadius: "0.5em"
};

const noResultsStyles = { ...generalStyles, fontWeight: "bold" };

const infoStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "1.25em",
  margin: "0 0.5em",
  width: "100%"
};

const buttonGeneralStyle = {
  cursor: "pointer",
  borderRadius: "1em",
  border: "none",
  width: 30,
  height: 30,
  color: "white",
  display: "flex",
  outline: "none",
  marginRight: "0.5em"
};

export {
  optionStyles,
  optionSelectedStyles,
  noResultsStyles,
  infoStyle,
  buttonGeneralStyle
};
