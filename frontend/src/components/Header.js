import React from "react";
import "./Header.css";

const Header = (handleClick) => {
  let userData = localStorage.getItem("user");

  const logOut = () => {
    localStorage.clear();
  };
  handleClick = (text) => {
    console.log(text);
  };

  return (
    <ul className="nav-bar-ul">
      <div className="navbar-brand ">
        <h1>Blood Bank</h1>
      </div>
      <li>
        <a href="home">Home</a>
      </li>
      <li className="dropdown">
        <a href="" className="dropbtn">
          Request blood
        </a>
        <div className="dropdown-content">
          <a href="/inRoutine" className="dropbtn">
            In routine
          </a>
          <a href="/MCI" className="dropbtn">
            Multiple casualty incident
          </a>
        </div>
      </li>
      <li className="dropdown">
        <a href="/donateBlood" className="dropbtn">
          Donate blood
        </a>
      </li>
      <li>
        <a href="/bloodStatus" className="dropbtn">
          Check blood status
        </a>
      </li>
    </ul>
  );
};

export default Header;
