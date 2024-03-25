import React, { useEffect, useState } from 'react'
import '../assets/css/checkout.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../slices/authSlice';
import { getCart, getTotalCartPrice, getTotalCartQuantity, resetCart } from '../slices/cartSlice';
import OrderItem from '../components/OrderItem';
import FormRow from '../components/FormRow';
import Spinner from '../components/Spinner';
import useFetchUser from '../hooks/useFetchUser';
import Button from '../components/Button';
import { BASE_URL, USER_URL } from '../constants';
import TotalBar from '../components/TotalBar';
import ErrorMessage from '../components/ErrorMessage';

function Checkout() {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(getUserInfo);
    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const totalCartQuantity = useSelector(getTotalCartQuantity);

    const [user, isLoading, errorMessage, errorStatus, errorStatusText] = useFetchUser();

    useEffect(function () {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo, navigate]);

    useEffect(function(){
        if(!totalCartPrice){
            navigate('/cart')
        }
    }, [])

    function handlePhone(e) {
        setPhone(e.target.value)
    }
    function handleAddress(e) {
        setAddress(e.target.value)
    }

    async function handleCheckout(e) {
        e.preventDefault();

        const orderDetails = {
            name: user.userDetails?.name,
            cart,
            totalOrderPrice: totalCartPrice,
            totalOrderQuantity: totalCartQuantity,
            contact: phone || user.userDetails?.phone,
            deliveryAddress: address || user.userDetails?.address,
            paymentMode
        }

        const res = await fetch(`${BASE_URL}${USER_URL}/orders`, {
            method: "POST",
            body: JSON.stringify(orderDetails),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();

        if(data.status === 'fail'){
            setMessage(data.message);
            return;
        }

        const orderId = data.results._id;
        dispatch(resetCart());
        localStorage.removeItem('cart');
        navigate(`/orders/${orderId}`);
    }
    
    return (
        <>
            {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> : <div className='checkout-container'>
                <div className="order-summary">
                    <h1>Order Summary</h1>
                    {cart.map(item => (
                        <OrderItem key={item._id} quantity={item.quantity} name={item.name} totalPrice={item.totalPrice} />
                    ))}
                    <TotalBar totalPrice={totalCartPrice} totalQuantity={totalCartQuantity} />
                </div>
                <form onSubmit={handleCheckout}>
                    <FormRow formLabel="Phone" inputType="tel" formValue={user.userDetails?.phone} onChange={handlePhone} isDisabled={false} isRequired={true} />
                    <FormRow formLabel="Address" inputType="text" formValue={user.userDetails?.address} onChange={handleAddress} isDisabled={false} isRequired={true} />

                    <div className='payment-mode'>
                        <div className="title">Payment Mode: </div>
                        <div className="options">
                            <div className='cash'>
                                <label htmlFor="cash">Cash: </label>
                                <input type="radio" name='payment' value="Cash" id="cash" onChange={e => setPaymentMode(e.target.value)} required />
                            </div>
                            <div className='card'>
                                <label htmlFor="card">Card: </label>
                                <input type="radio" name='payment' value="Card" id="card" onChange={e => setPaymentMode(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <Button styleClasses="secondary" text="Checkout" onClick={function nullFx(){}} />
                    {message && <p>{message}</p>}
                </form>
            </div>}
        </>
    )
}

export default Checkout