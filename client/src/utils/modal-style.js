const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

const formStyle = {
  width: "50%",
  backgroundColor: "white",
  padding: 10,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
  borderRadius: "0.5em",
  "@media (max-width: 850px)": {
    width: "70%"
  },
  "@media (max-width: 650px)": {
    width: "85%"
  },
  "@media (max-width: 450px)": {
    width: "90%",
    height: "90%"
  }
};

const fieldsetStyle = {
  border: "none",
  padding: "12px 30px",
  textAlign: "center",
  "@media (max-width: 500px)": {
    padding: "12px 8px"
  },
  "@media (max-width: 450px)": {
    padding: "16px 8px",
    marginLeft: "-20px"
  }
};

const labelStyle = {
  width: "20%",
  display: "inline-block",
  textAlign: "left",
  fontWeight: "bold",
  "@media (max-width: 600px)": {
    width: 100
  }
};

const buttonStyle = {
  width: 135,
  margin: "0 10px",
  "@media (max-width: 500px)": {
    width: 95
  }
};

export { sectionStyle, formStyle, fieldsetStyle, labelStyle, buttonStyle };
