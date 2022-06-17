import React from "react";
import "./Queue.css";

const QueueItem = (props) => {
  return (
    <div className="queue-item">
      <h4>{props.title}</h4>
      <div className="count">
        <h1>{props.count}</h1>
      </div>
    </div>
  );
};

const AnotherQueue = () => {
  return (
    <div className="wrap2">
      <h2 style={{ marginBottom: "10px", fontSize: "1.3rem" }}>
        Antrian yang sedang berlangsung
      </h2>
      <QueueItem title="Poli Umum" count="1" />
      <QueueItem title="Poli Kebidanan" count="1" />
      <QueueItem title="Poli Gigi" count="1" />
      <QueueItem title="Poli THT" count="1" />
    </div>
  );
};

export default AnotherQueue;
