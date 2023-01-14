import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

export default function Signup() {


  return (
    <div className="Signup">
      <h1>Signup</h1>
      <div className="username">
        <label htmlFor="username">Username</label><br />
        <input type="text" name="username" id="username" /> 
      </div>
      <div className="password">
        <label htmlFor="password">Password</label><br />
        <input type="password" name="password" id="password" />
      </div>
      <div className="signup-button">
      <Link to= '/dashboard'><button>Signup</button></Link>
      </div>
      <div className="login-button">
        <Link to ='/login'>Login</Link>
      </div>
    </div>
  )
}
