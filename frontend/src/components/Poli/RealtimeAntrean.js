import "./Button.css";

const RealtimeAntrean = ({
  polyId,
  onDoneQueue,
  onNotifyQueue,
  currNumber,
  minutes,
  seconds,
}) => {
  const doneQueueHandler = () => {
    onDoneQueue(polyId);
  };

  const notifyQueueHandler = () => {
    onNotifyQueue(polyId);
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
        <span className="square">{currNumber}</span>
        <span className="desc">
          {minutes}:{seconds}
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
