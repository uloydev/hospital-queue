import { useState } from "react";
import Wrap from "../UI/Wrap";
import { useHistory } from "react-router-dom";
import API from "../../lib/api";

const ProfileForm = () => {
  const history = useHistory();

  const [nameEntered, setNameEntered] = useState("");
  const [emailEntered, setEmailEntered] = useState("");
  const [noHpEntered, setNoHpEntered] = useState("");
  const [addressEntered, setAddressEntered] = useState("");

  const submitProfileHandler = (e) => {
    e.preventDefault();

    const data = {
      name: nameEntered,
      email: emailEntered,
      phone: noHpEntered,
      address: addressEntered,
    };

    API.post("/update-profile", {
      data,
    })
      .then((res) => {
        alert(res.message);
        return history.push("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div
      style={{
        width: "30rem",
        maxWidth: "90%",
      }}
    >
      <Wrap title="Data Diri" backgroundColor="#f1f1f1">
        <form onSubmit={submitProfileHandler}>
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name=""
              id="email"
              required
              onChange={(e) => setEmailEntered(e.target.value)}
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
              onChange={(e) => setAddressEntered(e.target.value)}
            />
          </div>
          <div className="form-control">
            <div className="action">
              <button className="primary" type="submit">
                Ubah Data Diri
              </button>
            </div>
          </div>
        </form>
      </Wrap>
    </div>
  );
};

export default ProfileForm;
