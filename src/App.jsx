import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import React, { useState } from 'react';
import { Routes, Switch, Route, PrivateRoute} from 'react-router-dom';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [username, setUsername] = useState('');


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
