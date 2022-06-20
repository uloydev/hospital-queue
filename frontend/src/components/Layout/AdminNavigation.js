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
          <Link to="/poli-umum">Poli Umum</Link>
        </li>
        <li>
          <Link to="/poli-tht">Poli THT</Link>
        </li>
        <li>
          <Link to="/poli-gigi">Poli Gigi</Link>
        </li>
        <li>
          <Link to="/poli-kebidanan">Poli Kebidanan</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
