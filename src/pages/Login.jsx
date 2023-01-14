import React from 'react'
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import '../styles/Login.css'
import { Link } from 'react-router-dom'

export default function Login() {

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

  return (
    <form onSubmit={onSubmit}>
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
    </form>
  )
};
