import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Wrap from "../UI/Wrap";
import API from "../../lib/api";
import AuthContext from "../../store/auth-context";

export const AuthAdmin = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const [emailEntered, setEmailEntered] = useState("");
  const [pwdEntered, setPwdEntered] = useState("");

  const submitAuthHandler = (e) => {
    e.preventDefault();

    API.post(`/admin/login`, {
      email: emailEntered,
      password: pwdEntered,
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        authCtx.login(data.admin.id, data.token, true);
        history.push("/users");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error);
      });
  };
  return (
    <div
      style={{
        width: "30rem",
        maxWidth: "90%",
      }}
    >
      <Wrap title="Login Admin" backgroundColor="#f1f1f1">
        <form onSubmit={submitAuthHandler}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPwdEntered(e.target.value)}
            />
          </div>
          <div className="form-control">
            <div className="action">
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </Wrap>
    </div>
  );
};

export default AuthAdmin;
