import { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import Wrap from "../UI/Wrap";
import API from "../../lib/api";
import AuthContext from "../../store/auth-context";

const AuthUser = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [chooseLogin, setChooseLogin] = useState(true);

  const [nameEntered, setNameEntered] = useState("");
  const [emailEntered, setEmailEntered] = useState("");
  const [alamatEntered, setAlamatEntered] = useState("");
  const [noHpEntered, setNoHpEntered] = useState("");
  const [pwdEntered, setPwdEntered] = useState("");
  const [pwdConfEntered, setPwdConfEntered] = useState("");

  const chooseAuthHandler = () => {
    setChooseLogin((prevState) => !prevState);
  };

  const submitAuthHandler = (e) => {
    e.preventDefault();

    if (chooseLogin) {
      API.post("/login", { email: emailEntered, password: pwdEntered })
        .then((res) => {
          if (res.status === 401) {
            return alert(res.error);
          }
          return res.data;
        })
        .then((user) => {
          authCtx.login(
            user.user.id,
            user.token,
            false,
            user.user.name,
            user.user.email,
            user.user.phone,
            user.user.address
          );
          history.push("/homepage");
        })
        .catch((err) => {
          console.log(err.response.data.error);
          alert(err.response.data.error);
        });
    } else {
      if (pwdEntered !== pwdConfEntered) {
        return alert("Passowrd tidak sama!");
      }

      API.post("/register", {
        email: emailEntered,
        password: pwdEntered,
        confirm_password: pwdConfEntered,
        name: nameEntered,
        phone: noHpEntered,
        address: alamatEntered,
      })
        .then((res) => {
          alert("Data user berhasil ditambahkan!");
          setChooseLogin(true);
        })
        .catch((err) => alert(err.error));
    }
  };

  let title = "Register";
  if (chooseLogin) {
    title = "Login";
  }

  const backClikHandler = () => {
    setChooseLogin(true);
  };

  return (
    <div
      style={{
        width: "30rem",
        maxWidth: "90%",
      }}
    >
      <Wrap
        title={title}
        backgroundColor="#f1f1f1"
        isBack
        onClickBack={backClikHandler}
      >
        <form onSubmit={submitAuthHandler}>
          {!chooseLogin && (
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
          )}
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
          {!chooseLogin && (
            <Fragment>
              <div className="form-control">
                <label htmlFor="no_hp">No Handphone</label>
                <input
                  type="text"
                  id="no_hp"
                  required
                  onChange={(e) => setNoHpEntered(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="alamat">Alamat</label>
                <textarea
                  type="text"
                  id="alamat"
                  required
                  onChange={(e) => setAlamatEntered(e.target.value)}
                />
              </div>
            </Fragment>
          )}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPwdEntered(e.target.value)}
            />
          </div>
          {!chooseLogin && (
            <div className="form-control">
              <label htmlFor="password_conf">Confirm Password</label>
              <input
                type="password"
                id="password_conf"
                required
                onChange={(e) => setPwdConfEntered(e.target.value)}
              />
            </div>
          )}
          <div className="form-control">
            <div className="action">
              <button className="primary" type="submit">
                {title}
              </button>
            </div>
          </div>
        </form>
        <p style={{ fontSize: "8px", marginTop: "15px" }}>
          Apakah kamu {chooseLogin ? "belum" : "sudah"} memiliki akun?{" "}
          <span className="link" onClick={chooseAuthHandler}>
            Klik disini
          </span>
        </p>
      </Wrap>
    </div>
  );
};

export default AuthUser;
