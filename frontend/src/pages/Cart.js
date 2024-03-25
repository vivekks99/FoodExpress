import React from 'react'
import { clearCart, getCart } from '../slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import EmptyCart from './EmptyCart';
import '../assets/css/cart.css'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import CartItem from '../ui/CartItem';

function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClearCart(){
    dispatch(clearCart());
    localStorage.removeItem('cart');
  }

  function handleOrderNow(){
    navigate('/checkout');
  }

  if(cart.length === 0){
    return <EmptyCart />
  }

  return (
    <div className='cart-container'>
        <div className='cart-header'>
          <h1>Your Cart</h1>
          <Button styleClasses="danger" text='Clear Cart' onClick={handleClearCart} />
        </div>
        {cart.map(item => (
            <CartItem item={item} key={item._id} />
        ))}
        <div className='order-now-btn'>
          <Button styleClasses="secondary" text='Order Now' onClick={handleOrderNow} />
        </div>
    </div>
  )
}

export default Cart