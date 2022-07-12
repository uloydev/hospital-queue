import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../lib/api";
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
  const [polys, setPolys] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/poly/counter`)
      .then((res) => {
        return res.data;
      })
      .then((data) => setPolys(data.polies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrap2">
      <h2 style={{ marginBottom: "10px", fontSize: "1.3rem" }}>
        Antrian yang sedang berlangsung
      </h2>
      <QueueItem
        title="Poli Umum"
        count={polys.length !== 0 ? polys[0].current_number : "0"}
      />
      <QueueItem
        title="Poli Gigi"
        count={polys.length !== 0 ? polys[1].current_number : "0"}
      />
      <QueueItem
        title="Poli THT"
        count={polys.length !== 0 ? polys[2].current_number : "0"}
      />
      <QueueItem
        title="Poli Kebidanan"
        count={polys.length !== 0 ? polys[3].current_number : "0"}
      />
    </div>
  );
};

export default AnotherQueue;
