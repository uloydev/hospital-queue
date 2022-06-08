import React from "react";

const MainQueue = (props) => {
  return (
    <div>
      <h2 style={{ marginBottom: "38px", fontSize: "1.4rem" }}>Antrian anda</h2>
      <div className="queue-user">
        <h4>Poli Umum</h4>
        <div className="count">
          <h1>1</h1>
        </div>
      </div>
    </div>
  );
};

export default MainQueue;
