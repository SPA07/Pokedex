import React, { useState } from "react";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangeName } from "../src/store/slices/userName.slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const dispatchUserName = () => {
    dispatch(ChangeName(userName));
    navigate("/pokedex");
  };

  return (
    <div className="login-container">
      <div className="login-img-container"></div>
      <h1>Hello trainer!</h1>
      <p>To get started, give me your name</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={dispatchUserName}>Start</button>
      </div>
      <footer className="footer-login">
        <div className="black-container">
          <div className="black-circle">
            <div className="little-black-circle"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
