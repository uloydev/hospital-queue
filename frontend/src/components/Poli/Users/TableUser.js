import React, { Fragment } from "react";
import "../Table.css";

const TableUser = (props) => {
  const { data } = props;
  return (
    <table className="fl-table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>No. Handphone</th>
          <th>Alamat</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {data.users?.map((item) => (
          <tr key={item.id}>
            <Fragment>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.password}</td>
            </Fragment>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUser;
