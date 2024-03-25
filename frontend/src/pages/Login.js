import React, { useEffect, useState } from 'react'
import '../assets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { BASE_URL, USER_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setCredentials } from '../slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo){
        navigate('/');
      }
  }, [userInfo, navigate])

  async function handleSubmit(e){
    e.preventDefault();

    const userData = {
        email,
        password
    }

    const res = await fetch(`${BASE_URL}${USER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await res.json();
    setMessage(result.message);
    if(!result.userDetails) return;

    const userId = {
        _id: result.userDetails._id,
        name: result.userDetails.name
    }

    dispatch(setCredentials(userId));
  }


  return (
    <>
    <div className='login-container'>
        <form onSubmit={handleSubmit}>
            <div className="login-form">
                <div className="email">
                    <label className="label" htmlFor="email">
                        Email
                    </label>
                    <input className="input" id="email" type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="password">
                    <label className="label" htmlFor="password">
                        Password
                    </label>
                    <input className="input error" id="password" type="password" placeholder="******************" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <p className="error-message">{message}</p>
                </div>
                <div className="login-submit flex items-center justify-between">
                    <button className="button" type="submit">
                        Log In
                    </button>
                    <p className="forgot-password">
                        Forgot Password?
                    </p>
                </div>
            </div>
        </form>
        
        <div className="signup-container">
            <p className="message">New to FoodExpress?</p>
            <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
        </div>
    </div>
    </>
  )
}

export default Login