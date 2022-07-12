import { useEffect, useContext, useState, useRef } from "react";
import IlustrationImg from "../../../assets/images/ilustrasi.png";
import axios from "axios";
import { baseUrl } from "../../../lib/api";
import AuthContext from "../../../store/auth-context";

const MainQueue = (props) => {
  const notifyCheckIn = localStorage.getItem("checkNotifyIn");

  const authCtx = useContext(AuthContext);

  const [queue, setQueue] = useState();

  const fetchData = () => {
    axios
      .get(`${baseUrl}/user/queue`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setQueue(data);
        console.log(data);
        if (data) {
          if (data.show_arrive_notification) {
            alert("Silahkan datang menuju klinik!");
          }
          if (data.show_check_notification) {
            alert("Silahkan masuk ruangan dokter!");
          }
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const first = useRef(fetchData);

  useEffect(() => {
    first.current();
  }, []);

  const arrivalHandler = () => {
    axios
      .get(`${baseUrl}/queue/${queue.queue.id}/confirm-arrival`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        alert("Berhasil melakukan konfirmasi kedatangan");
      });
  };

  const checkingHandler = () => {
    axios
      .get(`${baseUrl}/queue/${queue.queue.id}/confirm-check`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        alert("Berhasil melakukan konfirmasi pemeriksaan");
      });
  };

  console.log(queue);

  let isDisabled = false;
  if (!queue) {
    isDisabled = true;
  }

  return (
    <div style={{ width: "11.5rem" }}>
      <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>Antrian anda</h2>
      <div className="queue-user">
        <h4>Poli {queue ? queue.poly.name : ""}</h4>
        <div className="count">
          <h1>{queue ? queue.queue.number : ""}</h1>
        </div>
      </div>
      <div className="action ">
        <div>
          <button
            className="primary"
            style={{ width: "100%", padding: "0.5rem 0" }}
            onClick={arrivalHandler}
            disabled={isDisabled}
          >
            konfirmasi Kedatangan
          </button>
        </div>
        <div>
          <button
            className="warning"
            style={{ width: "100%", padding: "0.5rem 0" }}
            onClick={checkingHandler}
            disabled={isDisabled}
          >
            konfirmasi Pemeriksaan
          </button>
        </div>
      </div>
      <div className="ilustration-img">
        <img alt="" srcSet={IlustrationImg} />
      </div>
    </div>
  );
};

export default MainQueue;
