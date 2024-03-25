import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../assets/css/signup.css'
import { BASE_URL, USER_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setCredentials } from '../slices/authSlice';

function Signup() {
  const [name, setUsername] = useState('');
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

    const newUser = {
        name,
        email,
        password
    }
    
    const res = await fetch(`${BASE_URL}${USER_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(newUser),
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

    navigate('/');
    

  }

  return (
    <>
        <div className='register-container'>
            <form onSubmit={handleSubmit}>
                <div className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Username</label>
                        <input id="name" type="text" name="name" placeholder="Username" value={name} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="text" name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)} required />
                        {message && <p className="error-message">{message}</p>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="register-button">Register</button>
                        <div className="login-section">
                            <p className="login-text">Already have an account?</p>
                            <NavLink to="/login" className="login-link">Log In</NavLink>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Signup