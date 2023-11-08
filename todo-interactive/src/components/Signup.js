import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Signup = ({ handleSignup }) => {
  const [signupData, setSignupData] = useState({ email: '', username: '', password: '' });

  const navigate = useNavigate(); 

  const handleSignupClick = () => {
    handleSignup(signupData);
  };

  const goToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Sign Up</h1>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Choose a username"
          required
          onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Create a password"
          required
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        />
      </div>
      <button type="submit" className="btn" onClick={handleSignupClick}>
        Sign Up
      </button>
      <button className="btn login-button" onClick={goToLogin}>Login</button> 
    </div>
  );
};

export default Signup;
