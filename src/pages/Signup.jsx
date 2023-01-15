import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../styles/Signup.css'

export default function Signup(props) {

  const navigate = useNavigate();
  const { setUser } = props;

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log(username,  password);
  

  function handleSignup() {
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(response => response.json())
    .then(data => {
      console.log('submit', data)
      setUser(data);
      // if (data.success) { // if the login was successful - make sure success is a key in response
        navigate('/dashboard')
      // }
    })
    .catch(err => {
      console.log(err)
      navigate('/signup')
    })

  }
  

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }


  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }


  return (
    <div className="Signup">
      <h1>Signup</h1>
      <div className="username">
        <label htmlFor="username">Username</label><br />
        <input onChange={handleUsernameChange} type="text" name="username" id="username" /> 
      </div>
      <div className="password">
        <label htmlFor="password">Password</label><br />
        <input onChange={handlePasswordChange} type="password" name="password" id="password" />
      </div>
      <div className="signup-button">
      <Link to= '/dashboard'><button onClick={handleSignup}>Signup</button></Link>
      </div>
      <div className="login-button">
        <Link to ='/login'>Login</Link>
      </div>
    </div>
  )
}
