import React from "react";
import AnotherQueue from "./AnotherQueue";
import MainQueue from "./MainQueue";
import "./Queue.css";

const Queue = () => {
  return (
    <div className="queue">
      <AnotherQueue />
      <MainQueue />
    </div>
  );
};

export default Queue;
