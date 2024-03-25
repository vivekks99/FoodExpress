import React, { useState } from 'react'
import '../assets/css/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCartQuantity, resetCart } from '../slices/cartSlice';
import { getUserInfo, logout } from '../slices/authSlice';
import { BASE_URL, USER_URL } from '../constants';

function Navbar() {
    const [showDropDownContent, setShowDropDownContent] = useState(false);

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const cartQuantity = useSelector(getTotalCartQuantity);
    const userInfo = useSelector(getUserInfo);

    async function handleLogout(){
        await fetch(`${BASE_URL}${USER_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(logout());
        dispatch(resetCart());
        setShowDropDownContent(false);
        navigate('/');
    }

    window.onclick = function(event){
        const clickedClass = event.target.className.split(' ');
        const isDropdownClicked = clickedClass.includes('user-icon') || clickedClass.includes('fa-user')
        if(!showDropDownContent || isDropdownClicked) return;
        setShowDropDownContent(false)
    }

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <NavLink to="/"><img src="/logo.png" alt="logo" /></NavLink>
                </div>
                <div className='flex-center'>
                    <ul className="nav-menu">
                        <li className="links hover flex-center" onClick={() => navigate("cart")}>
                            <div className='cart-icon'><i className="fas fa-shopping-cart"></i></div>
                            {cartQuantity ? <div className="cart-quantity-rounded rounded">{cartQuantity}</div> : ''}
                        </li>
                        
                        <div className="dropdown">
                            <li className="links user-icon" onClick={() => setShowDropDownContent(i => !i)}>
                                {userInfo ? userInfo.name[0].toUpperCase() : <i className="fas fa-user"></i>}
                            </li>
                            {showDropDownContent && <div className="dropdown-content">
                                {userInfo ? 
                                <>
                                    <NavLink to="/profile">Profile</NavLink>
                                    <NavLink to="/orders">Orders</NavLink>
                                    <NavLink onClick={() => handleLogout()}>Logout</NavLink>
                                </> 
                                :
                                <>
                                    <NavLink to="/login">Login</NavLink>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </>}
                            </div>}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar