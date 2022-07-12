import { useState, useContext } from "react";
import Wrap from "../UI/Wrap";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../lib/api";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const [nameEntered, setNameEntered] = useState(authCtx.name);
  const [emailEntered, setEmailEntered] = useState(authCtx.email);
  const [noHpEntered, setNoHpEntered] = useState(authCtx.phone);
  const [addressEntered, setAddressEntered] = useState(authCtx.address);

  const submitProfileHandler = (e) => {
    e.preventDefault();

    axios
      .put(
        `${baseUrl}/user`,
        {
          name: nameEntered,
          email: emailEntered,
          phone: noHpEntered,
          address: addressEntered,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        alert("Berhasil mengubah data user!");
        authCtx.changeData({
          name: nameEntered,
          email: emailEntered,
          phone: noHpEntered,
          address: addressEntered,
        });
        return history.push("/homepage");
      })
      .catch((err) => {
        alert("something went wrong!");
        console.log(err);
      });
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name=""
              id="email"
              required
              onChange={(e) => setEmailEntered(e.target.value)}
              value={emailEntered}
              disabled
            />
          </div>
          <div className="form-control">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              name=""
              id="nama"
              required
              onChange={(e) => setNameEntered(e.target.value)}
              value={nameEntered}
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
              value={noHpEntered}
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
              value={addressEntered}
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
