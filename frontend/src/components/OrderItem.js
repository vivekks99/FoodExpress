import React from 'react'
import '../assets/css/order-item.css'

function OrderItem({quantity, name, totalPrice}) {

  return (
    <div className='order-item'>
        <div className="order-name">
            <div className="order-qnty">{quantity} <i className="fas fa-times"></i></div>
            <div className="order-title">{name}</div>
        </div>
        <div className="order-price">₹{totalPrice}</div>
    </div>
  )
}

export default OrderItem