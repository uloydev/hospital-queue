import React from "react";

const Wrap = (props) => {
  const style = {
    padding: "1rem 3rem",
    backgroundColor: `${props.backgroundColor}`,
    borderRadius: "15px",
    border: "1px solid #919191",
    textAlign: "center",
    boxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
    WebkitBoxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
    MozBoxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
  };

  return (
    <div style={style}>
      <h2 style={{ marginBottom: "30px" }}>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default Wrap;
