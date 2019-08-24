const containerStyle = {
  minHeight: "100vh",
  margin: "0 0 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const formStyle = {
  justifyContent: "space-around",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
  padding: "1.5em",
  backgroundColor: "#eeeeee",
  borderRadius: "0.5em",
  width: "80%",
  "@media (min-width: 800px)": {
    width: "45%"
  }
};

const labelStyle = {
  fontSize: "1.5em",
  fontWeight: "bold"
};

const inputStyle = {
  fontSize: "20px",
  padding: "10px",
  outline: "none",
  border: "1px solid white",
  textAlign: "center",
  "&:focus": { borderBottom: "1px solid #000" }
};

const h1Style = {
  textAlign: "center",
  color: "#000",
  margin: "0.5em 0"
};

const errorStyle = {
  color: "red",
  fontWeight: "bold",
  fontSize: "1em",
  textAlign: "center"
};

export {
  containerStyle,
  formStyle,
  labelStyle,
  inputStyle,
  h1Style,
  errorStyle
};
