import React from "react";
import { useState } from "react";
import "../Styles/login.css";

const LoginAdmin = () => {
  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });
  const LoginAdmin = () => {
    console.log(loginData)
  };

  return (
    <section className="user-admin">
      <div className="login-card">
        <input
          type="text"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <input
          type="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <input type="button" value="Login" onClick={LoginAdmin} />
      </div>
    </section>
  );
};

export default LoginAdmin;
