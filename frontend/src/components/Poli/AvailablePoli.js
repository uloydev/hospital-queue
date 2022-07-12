import { useEffect, useState, useContext, useRef } from "react";
import { baseUrl } from "../../lib/api";
import { useParams } from "react-router-dom";
import ButtonAction from "./ButtonAction";
import TablePoli from "./TablePoli";
import RealtimeAntrean from "./RealtimeAntrean";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const AvailablePoli = () => {
  const { polyId } = useParams("polyId");
  const authCtx = useContext(AuthContext);

  const [polys, setPolys] = useState([]);
  const [currPolys, setCurrPolys] = useState([]);
  const [deadline, setDeadline] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const interval = useRef();

  useEffect(() => {
    axios
      .get(`${baseUrl}/poly/${polyId}/queue`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setPolys(data.queues);
      });
  }, [authCtx, polyId]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/poly/counter`)
      .then((res) => {
        setCurrPolys(res.data.polies);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const t = deadline - now;

      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);

      if (t < 0) {
        clearInterval(interval.current);
        setMinutes("Waktu sudah habis");
        setSeconds("silahkan menuju antrian selanjutnya!");
      } else {
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [deadline]);

  const resetQueueHandler = () => {
    axios
      .post(
        `${baseUrl}/queue/reset`,
        {
          poli_id: `${polyId}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Data antrian berhasil dihapus");
        document.location.reload(true);
      });
  };

  const openPolyHandler = () => {
    axios
      .post(
        `${baseUrl}/poly/${polyId}/status`,
        {
          is_open: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Poli berhasil dibuka");
      });
  };

  const closePoliHandler = () => {
    axios
      .post(
        `${baseUrl}/poly/${polyId}/status`,
        {
          is_open: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Poli berhasil ditutup");
      });
  };

  const doneQueueHandler = (polyId) => {
    axios
      .post(
        `${baseUrl}/queue/next`,
        {
          poli_id: polyId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Berhasil mengubah antrian");
        document.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const notifyQueueHandler = (polyId) => {
    axios
      .post(
        `${baseUrl}/queue/notify`,
        {
          poli_id: polyId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Notifikasi berhasil dikirim!");
        // document.location.reload(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    const deadline = new Date().setMinutes(new Date().getMinutes() + 10);
    setDeadline(deadline);
  };

  let poly;

  switch (polyId) {
    case "1":
      poly = "Umum";
      break;
    case "2":
      poly = "Gigi";
      break;
    case "3":
      poly = "THT";
      break;
    default:
      poly = "Kebidanan";
      break;
  }

  const currPoly = currPolys.filter((item) => item.id === polyId)[0];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h2 style={{ textAlign: "right", marginBottom: "20px" }}>
        Antrian Poli {poly}
      </h2>
      <ButtonAction
        closePoli={closePoliHandler}
        openPoli={openPolyHandler}
        resetPoli={resetQueueHandler}
      />
      <TablePoli data={polys} />
      <RealtimeAntrean
        polyId={polyId}
        minutes={minutes}
        seconds={seconds}
        currNumber={currPoly ? currPoly.current_number : "0"}
        onDoneQueue={doneQueueHandler}
        onNotifyQueue={notifyQueueHandler}
      />
    </div>
  );
};

export default AvailablePoli;
