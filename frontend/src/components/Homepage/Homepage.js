import React from "react";
import Wrap from "../UI/Wrap";
import Queue from "./Queue/Queue";
import Link from "./Link/Link";

const Homepage = () => {
  const homepageStyle = {
    minWidth: "20rem",
    maxWidth: "90%",
  };

  const wrapStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div style={homepageStyle}>
      <Wrap title="" backgroundColor="#6DD8CB">
        <div style={wrapStyle}>
          <Link />
          <Queue />
        </div>
      </Wrap>
    </div>
  );
};

export default Homepage;
