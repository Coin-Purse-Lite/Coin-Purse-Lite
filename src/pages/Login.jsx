import React, { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {

  const {masterUsername} = props;
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.success) { // if the login was successful - make sure success is a key in response
        navigate('/dashboard')
      }
    })
  }


  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }


  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }


  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="username">
        <label htmlFor="username">Username</label><br />
        <input onChange={handleUsernameChange} type="text" name="username" id="username" /> 
      </div>
      <div className="password">
        <label htmlFor="password">Password</label><br />
        <input onChange={handlePasswordChange} type="password" name="password" id="password" />
      </div>
      <div className="login-button">
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="signup-button">
        <Link to ='/signup'>Signup</Link>
      </div>
    </div>
  )
}
