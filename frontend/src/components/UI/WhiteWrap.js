import React from "react";

const WhiteWrap = (props) => {
  const style = {
    padding: "1rem 3rem",
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    border: "2px solid #919191",
    textAlign: "center",
  };

  return (
    <div style={style}>
      <h2 style={{ marginBottom: "30px" }}>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default WhiteWrap;
