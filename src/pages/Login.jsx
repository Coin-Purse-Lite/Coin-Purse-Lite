import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'

export default function Login() {


  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="username">
        <label htmlFor="username">Username</label><br />
        <input type="text" name="username" id="username" /> 
      </div>
      <div className="password">
        <label htmlFor="password">Password</label><br />
        <input type="password" name="password" id="password" />
      </div>
      <div className="login-button">
        <Link to= '/dashboard'><button>Login</button></Link>
      </div>
      <div className="signup-button">
        <Link to ='/signup'>Signup</Link>
      </div>
    </div>
  )
}
