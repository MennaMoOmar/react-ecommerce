import React from "react";

import { NavLink } from "react-router-dom";
import "./style.css"

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ fontFamily: "serif" }}>
          <img src="./images/logo.png" alt="" style={{width:"40px"}}></img>
          <span style={{position:"relative", top:"6px", left:"5px"}}>Food</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ flexDirection: "column" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                <i className="fas fa-home"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                <i className="fas fa-info"></i> About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                <i className="fas fa-utensils"></i> Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
              {props.count}<i className="fas fa-cart-plus"></i> Cart
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="btn btn-danger" style={{ backgroundColor: "#af3810", borderColor:"#af3810"}}>
          <NavLink className="nav-link" to="/admin" style={{color:"white", padding:"0px"}}>
            Admin
          </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
