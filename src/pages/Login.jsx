import React, { useState } from 'react'
import axios from 'axios';
// import { useSignIn } from 'react-auth-kit';
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

export default function Login(props) {

  const {masterUsername, setUser, dashList, setDashList} = props;
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const [loggedInUser, setLoggedInUser] = useState({});


  function handleLogin() {
    fetch('http://localhost:3001/login', {
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
      setUser(data.user);
      // if (data.success) { // if the login was successful - make sure success is a key in response
      setDashList(data.coinInfo);
      console.log('returned user is ', data.user);
      console.log('coinInfo is ', data.coinInfo);
      navigate('/dashboard')
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
    setPassword(event.target.value)
  }


  function handleUsernameChange(event) {
    console.log('username is ', event.target.value);
    setUsername(event.target.value)
  }


/*
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({email: '', password: ''});

    const onSubmit = (e) => {
    
      e.preventDefault()
      axios.post('/api/login', formData)
        .then((res)=>{
          if(res.status === 200){
            if(signIn(
              {
                token: res.data.token,
                expiresIn:res.data.expiresIn,
                tokenType: "Bearer",
                authState: res.data.authUserState,
                refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
              }
            )){
            // Redirect to dashboard #####**#*#**#*#*#*#*  START HERE ON SATURDAY  *$**#*%*&#((#(&#)))
            }else {
            //Throw error
            }
          }
        })
    }
    */

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
    {/* <form onSubmit={onSubmit}>
      <div className="Login">
        <h1>Login</h1>
        <div className="username">
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" onChange={(e)=>setFormData({...formData, email: e.target.value})}/> 
        </div>
        <div className="password">
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
        <div className="signup-button">
          <Link to ='/signup'>Signup</Link>
        </div>
      </div>
    </form> */}
    </div>
  )
};
