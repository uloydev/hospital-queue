import { useContext, useState, useEffect } from "react";
import { baseUrl } from "../../../lib/api";
import TableUser from "./TableUser";
import axios from "axios";
import AuthContext from "../../../store/auth-context";

const Users = () => {
  const [users, setUsers] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => alert(err));
  }, [authCtx]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Data Pasien</h2>
      <TableUser data={users} />
    </div>
  );
};

export default Users;
