import React, { useState } from "react";
import axios from "axios";
// import { useSignIn } from 'react-auth-kit';
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";

export default function Login(props) {

  const {masterUsername, setUser, dashList, setDashList} = props;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [loggedInUser, setLoggedInUser] = useState({});

  function handleLogin() {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        navigate('/login')
      } else {
        console.log(data)
        setUser(data.user);
        // if (data.success) { // if the login was successful - make sure success is a key in response
        setDashList(data.coinInfo);
        console.log('returned user is ', data.user);
        console.log('coinInfo is ', data.coinInfo);
        navigate('/dashboard')
      }
      // }
    })
    .catch(err => {
      console.log(err)
      navigate('/login')
    })


    // setUser({username: 'hello', password: 'test'});
    // navigate('/dashboard')
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleUsernameChange(event) {

    // console.log('username is', event.target.value);
    setUsername(event.target.value)

  }


  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="username">
        <label htmlFor="username">Username</label>
        <br />
        <input
          onChange={handleUsernameChange}
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div className="login-button">
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="signup-button">
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
