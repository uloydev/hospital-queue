import React from "react";
import "./Link.css";

const LinkItem = (props) => {
  const itemStyle = {
    width: "130px",
    height: "100px",
    backgroundColor: `${props.bgcolor}`,
    textAlign: "left",
    padding: "1rem",
    color: "#FFFCFC",
    marginBottom: "20px",
    borderRadius: "15px",
    boxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
    WebkitBoxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
    MozBoxShadow: "7px 8px 8px -5px rgba(0,0,0,0.33)",
  };
  return (
    <div style={itemStyle} className="item-link" onClick={props.onClick}>
      {props.title}
    </div>
  );
};

export default LinkItem;
