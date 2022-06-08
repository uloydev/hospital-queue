import React from "react";
import Link from "./Link/Link";
import Queue from "./Queue/Queue";
import Wrap from "../UI/Wrap";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <Wrap title="" backgroundColor="#6DD8CB">
        <div className="wrap">
          <Link />
          <Queue />
        </div>
      </Wrap>
    </div>
  );
};

export default Homepage;
