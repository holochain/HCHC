import * as React from "react";
import "./Nav.css";

const Nav = () =>
  <nav className="nav nav-pills flex-column flex-sm-row">
    <a className="flex-sm-fill text-sm-center nav-link active" href="/console">Developer Console</a>
    <a className="flex-sm-fill text-sm-center nav-link" href="/console/upload">Upload an App</a>>
    <a className="flex-sm-fill text-sm-center nav-link disabled" href="#">My Profile</a>
  </nav>
export default Nav;
