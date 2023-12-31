
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../css/styles.css';


const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleLoginClick = async () => {
    try {
      const response = await fetch('https://nm-backend-ctri.onrender.com/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result + "red");
        if (result.result == true) {
          console.log("workignn");
          localStorage.setItem("userEmail", loginData.email);
          localStorage.setItem('userUid',result.id)
          navigate('/index');
        } else {
          alert("incorrect value ");

          console.log('Incorrect login data');
        }
      } else {
        alert("no data found");

        console.log('Network or server error');
      }
    } catch (error) {
      alert("no value present");

      console.error('An unexpected error occurred', error);
    }
  };

  const goToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className='header-h1'>Login</h1>
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
