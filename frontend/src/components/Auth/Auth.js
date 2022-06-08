import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import WhiteWrap from "../UI/WhiteWrap";
import classes from "./Auth.module.css";
import domainUrl from "../../lib/domain-url";

const Auth = () => {
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

    if (pwdEntered !== pwdConfEntered) {
      return alert("Passowrd tidak sama!");
    }

    let url;
    if (chooseLogin) {
      url = `${domainUrl}/login`;
      axios
        .post(url, {
          email: emailEntered,
          password: pwdEntered,
        })
        .then((response) => {
          console.log(response);
          history.push("/homepage");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      url = `${domainUrl}/register`;
      axios
        .post(url, {
          nama: nameEntered,
          email: emailEntered,
          noHp: noHpEntered,
          alamat: alamatEntered,
          password: pwdEntered,
        })
        .then((response) => {
          console.log(response);
          setChooseLogin(true);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  let title = "Register";
  if (chooseLogin) {
    title = "Login";
  }

  return (
    <div
      className={classes.auth}
      style={{
        width: "30rem",
        maxWidth: "90%",
      }}
    >
      <WhiteWrap title={title}>
        <form onSubmit={submitAuthHandler}>
          {!chooseLogin && (
            <div className="form-control">
              <label htmlFor="nama">Nama</label>
              <input type="text" name="" id="nama" required />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name="" id="email" required />
          </div>
          {!chooseLogin && (
            <Fragment>
              <div className="form-control">
                <label htmlFor="no_hp">No Handphone</label>
                <input type="text" name="" id="no_hp" required />
              </div>
              <div className="form-control">
                <label htmlFor="alamat">Alamat</label>
                <textarea type="text" name="" id="alamat" required />
              </div>
            </Fragment>
          )}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="" id="password" required />
          </div>
          {!chooseLogin && (
            <div className="form-control">
              <label htmlFor="password_conf">Confirm Password</label>
              <input type="password" name="" id="password_conf" required />
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
      </WhiteWrap>
    </div>
  );
};

export default Auth;
