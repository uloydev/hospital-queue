import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
const AdminNavigation = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/poli/1/queue">Poli Umum</Link>
        </li>
        <li>
          <Link to="/poli/2/queue">Poli Gigi</Link>
        </li>
        <li>
          <Link to="/poli/3/queue">Poli THT</Link>
        </li>
        <li>
          <Link to="/poli/4/queue">Poli Kebidanan</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
