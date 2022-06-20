import React from "react";

const ButtonAction = () => {
  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <button className="danger">Tutup</button>
      <button className="primary">Buka</button>
      <button className="warning">Reset</button>
    </div>
  );
};

export default ButtonAction;
