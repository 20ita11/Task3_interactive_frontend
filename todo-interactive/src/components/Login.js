import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../css/styles.css';

const Login = ({ handleLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    handleLogin(loginData);
  };

  const goToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
      </div>
      <button type="submit" className="btn form-group" onClick={handleLoginClick}>
        Login
      </button>
      <button onClick={goToSignup} className="btn">Signup</button> 
    </div>
  );
};

export default Login;
