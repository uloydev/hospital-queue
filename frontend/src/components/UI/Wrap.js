import React from "react";
import BtnBack from "../../assets/images/btn_back.png";

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

  const styleSpan = {
    position: "absolute",
    display: "block",
    width: "30px",
    height: "30px",
    cursor: "pointer",
  };

  const backClickHandler = () => {
    props.onClickBack();
  };

  return (
    <div style={style}>
      <div>
        {props.isBack && (
          <img
            srcSet={BtnBack}
            alt=""
            style={styleSpan}
            onClick={backClickHandler}
          />
        )}
        <h2 style={{ marginBottom: "30px" }}>{props.title}</h2>
      </div>
      {props.children}
    </div>
  );
};

export default Wrap;
