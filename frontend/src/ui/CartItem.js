import React from 'react'
import '../assets/css/cartitem.css'
import { useDispatch } from 'react-redux';
import { decreaseCart, deleteItem, increaseCart } from '../slices/cartSlice';

const imgPath = '/images';

function CartItem({item}) {
  const dispatch = useDispatch();


  return (
    <div className='cart-item-container'>
        <div className='img'><img src={imgPath + item.image} alt="" /></div>
        <div className='content'>
          <div className='name'><div>{item.name}</div></div>
          <div className='price'><div>₹ {item.totalPrice}</div></div>
          <div className="cart-operations">
            <div className='icons rounded operator' onClick={() => dispatch(decreaseCart(item._id))}><i className="fas fa-minus"></i></div>
            <div className='icons rounded quantity'>{item.quantity}</div>
            <div className='icons rounded operator' onClick={() => dispatch(increaseCart(item._id))}><i className="fas fa-plus"></i></div>
          </div>
          <div className='icons rounded trash' onClick={() => dispatch(deleteItem(item._id))}><i className="fas fa-trash"></i></div>
        </div>
    </div>
  )
}

export default CartItem