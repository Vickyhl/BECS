import React from "react";
import "./Header.css";

const Header = (handleClick) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.isAdmin;
  const isStudent = userData?.student;
  const isUser = userData?.user;

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
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/login">Login</a>
      </li>
      {(isAdmin || isUser) && (
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
      )}
      {(isAdmin || isUser) && (
        <li className="dropdown">
          <a href="/donateBlood" className="dropbtn">
            Donate blood
          </a>
        </li>
      )}
      <li>
        <a href="/bloodStatus" className="dropbtn">
          Check blood status
        </a>
      </li>
      <li>
        <a href="/exportFiles" className="dropbtn">
          Export files
        </a>
      </li>
    </ul>
  );
};

export default Header;
