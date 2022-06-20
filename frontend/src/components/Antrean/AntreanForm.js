import { useState } from "react";
import Wrap from "../UI/Wrap";
import { useHistory } from "react-router-dom";
import "./Antrean.css";
import API from "../../lib/api";

const AntreanForm = () => {
  const history = useHistory();

  const [nameEntered, setNameEntered] = useState("");
  const [alamatEntered, setAlamatEntered] = useState("");
  const [noHpEntered, setNoHpEntered] = useState("");
  const [poliChange, setPoliChange] = useState("");
  const [complainEntered, setComplainEntered] = useState("");

  const sumbitTakeAntrean = (e) => {
    e.preventDefault();

    const data = {
      name: nameEntered,
      address: alamatEntered,
      phone: noHpEntered,
      poli: poliChange,
      complain: complainEntered,
    };

    API.post("/new-antrean", data)
      .then((res) => history.push("/homepage"))
      .catch((err) => alert(err));
  };

  return (
    <div className="wrap-antrean">
      <Wrap backgroundColor="#f1f1f1" title="Isi data ambil antrean">
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
                  onChange={(e) => setPoliChange(e.target.value)}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="umum">Poli umum</option>
                  <option value="gigi">Poli gigi</option>
                  <option value="tht">Poli tht</option>
                  <option value="bidan">Poli bidan</option>
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
                Untuk poli yang tidak bisa dipilih/diklik menandakan poli
                tersebut sedang ditutup.
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
