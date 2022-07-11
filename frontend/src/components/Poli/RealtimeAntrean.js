import React from "react";
import "./Button.css";

const RealtimeAntrean = (props) => {
  const doneQueueHandler = () => {
    props.onDoneQueue(props.polyId);
  };
  const notifyQueueHandler = () => {
    props.onNotifyQueue(props.polyId);
  };
  return (
    <div>
      <h4
        style={{
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        Nomor Antrean yang sedang berlangsung
      </h4>
      <div>
        <span className="square">{props.currNumber}</span>
        <span className="desc">
          {props}
          {props.minutes}:{props.seconds}
        </span>
      </div>
      <div>
        <button
          style={{
            background: "#D900FD",
            color: "white",
            padding: "0.5rem 1.2rem",
            marginBottom: "15px",
            marginTop: "40px",
          }}
          onClick={notifyQueueHandler}
        >
          Notifikasi Pemeriksaan
        </button>
      </div>
      <div>
        <button className="success white" onClick={doneQueueHandler}>
          Selesai
        </button>
      </div>
    </div>
  );
};

export default RealtimeAntrean;
