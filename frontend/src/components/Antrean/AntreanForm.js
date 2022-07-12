import { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import Wrap from "../UI/Wrap";
import { useHistory } from "react-router-dom";
import "./Antrean.css";
import { baseUrl } from "../../lib/api";

const AntreanForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const polyId = useRef();

  const [nameEntered, setNameEntered] = useState("");
  const [alamatEntered, setAlamatEntered] = useState("");
  const [noHpEntered, setNoHpEntered] = useState("");
  const [complainEntered, setComplainEntered] = useState("");

  const [polys, setPolys] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/poly`)
      .then((res) => {
        return res.data.poly;
      })
      .then((data) => {
        setPolys(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sumbitTakeAntrean = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseUrl}/queue`,
        {
          name: nameEntered,
          phone: noHpEntered,
          address: alamatEntered,
          poli_id: polyId.current.value,
          complaint: complainEntered,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Berhasil menambah antrean");
        history.push("/homepage");
      })
      .catch((err) => alert(err));
  };

  const clickBackHandler = () => {
    history.push("/homepage");
  };

  return (
    <div className="wrap-antrean">
      <Wrap
        backgroundColor="#f1f1f1"
        title="Isi data ambil antrean"
        isBack
        onClickBack={clickBackHandler}
      >
        <div className="take-antrean">
          <div className="form">
            <form onSubmit={sumbitTakeAntrean}>
              <div className="form-control">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  name=""
                  id="nama"
                  required
                  onChange={(e) => setNameEntered(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="no_hp">No Handphone</label>
                <input
                  type="text"
                  name=""
                  id="no_hp"
                  required
                  onChange={(e) => setNoHpEntered(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="alamat">Alamat</label>
                <textarea
                  type="text"
                  name=""
                  id="alamat"
                  required
                  onChange={(e) => setAlamatEntered(e.target.value)}
                />
              </div>
              <div className="form-control" style={{ textAlign: "left" }}>
                <label htmlFor="poli">Poli</label>
                <select
                  name=""
                  id="poli"
                  ref={polyId}
                  required
                  style={{ width: "100%" }}
                >
                  {polys?.map((item) =>
                    item.is_open === "1" ? (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="keluhan">Keluhan</label>
                <textarea
                  type="text"
                  name=""
                  id="keluhan"
                  required
                  onChange={(e) => setComplainEntered(e.target.value)}
                />
              </div>
              <div className="action">
                <button className="primary" type="submit">
                  Ambil antran
                </button>
              </div>
            </form>
          </div>
          <div className="info">
            <h4>PERINGATAN</h4>
            <ol>
              <li>
                Bagi para pasien yang sudah mendaftar antrian, diharapkan untuk
                selalu mengecek dan merefresh website, karena antrian akan
                dipanggil melalui notifikasi yang ada di website.
              </li>
              <li>
                Untuk poli yang sudah tutup, tidak ditampilkan dalam form poli.
              </li>
              <li>
                Pasien diberi waktu 10 menit saat sudah giliran nomer antriannya
                tiba, jika telat atau tidak datang maka akan dianggap selesai.{" "}
              </li>
            </ol>
          </div>
        </div>
      </Wrap>
    </div>
  );
};

export default AntreanForm;
