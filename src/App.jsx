import './App.css';
// import { AuthProvider } from 'react-auth-kit';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import React, { useState } from 'react';
import { Routes, Switch, Route, PrivateRoute} from 'react-router-dom';
import PriceChart from './components/PriceChart';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  // const [username, setUsername] = useState('');
  const [dashList, setDashList] = useState([]);


  return (
    <div className="App">
      {/* <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}> */}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup setUser = {(user) => setUser(user)} />} />
        <Route path='/login' element={<Login setUser = {(user) => setUser(user)} />} />
        <Route path='/dashboard/*' element={<Dashboard user = {user} />} />
      </Routes>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
