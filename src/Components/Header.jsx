import React from "react";
import logo from "../Icons/logo.svg";
import "../Styles/header.css";
import close from "../Icons/add.png"
import { useDispatch } from "react-redux";
import { AdminOptionAction, LeftBarAction } from "../Redux/Actions/Action"

const Header = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="header">
        <img onClick={() => dispatch(LeftBarAction(true))} src={close} />
        <div className="h_left">
          <img onClick={() => dispatch(AdminOptionAction("dashboard"))} src={logo} alt="" />
        </div>
        <div className="h_right">
          <div>
            <img src={logo} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
