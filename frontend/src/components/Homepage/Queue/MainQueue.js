import IlustrationImg from "../../../assets/images/ilustrasi.png";

const MainQueue = (props) => {
  return (
    <div style={{ width: "11.5rem" }}>
      <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>Antrian anda</h2>
      <div className="queue-user">
        <h4>Poli Umum</h4>
        <div className="count">
          <h1>1</h1>
        </div>
      </div>
      <div className="action ">
        <div>
          <button
            className="primary"
            style={{ width: "100%", padding: "0.5rem 0" }}
          >
            konfirmasi Kedatangan
          </button>
        </div>
        <div>
          <button
            className="warning"
            style={{ width: "100%", padding: "0.5rem 0" }}
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
