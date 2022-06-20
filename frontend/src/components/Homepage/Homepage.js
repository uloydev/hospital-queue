import React from "react";
import Wrap from "../UI/Wrap";
import Queue from "./Queue/Queue";
import Link from "./Link/Link";

const Homepage = () => {
  return (
    <div
      style={{
        Width: "90rem",
        maxWidth: "90%",
      }}
    >
      <Wrap title="" backgroundColor="#6DD8CB">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Link />
          <Queue />
        </div>
      </Wrap>
    </div>
  );
};

export default Homepage;
