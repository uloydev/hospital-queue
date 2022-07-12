import React from "react";
import "./Button.css";

const ButtonAction = (props) => {
  return (
    <div className="button-action">
      <button
        className="danger"
        style={{ color: "#f1f1f1" }}
        onClick={props.closePoli}
      >
        Tutup
      </button>
      <button
        className="primary"
        style={{ color: "#f1f1f1" }}
        onClick={props.openPoli}
      >
        Buka
      </button>
      <button
        className="warning"
        style={{ backgroundColor: "#FFF500" }}
        onClick={props.resetPoli}
      >
        Reset
      </button>
    </div>
  );
};

export default ButtonAction;
