import React from 'react'
import '../assets/css/order-card.css'
import { useNavigate } from 'react-router-dom';
import OrderStatusButton from './OrderStatusButton';

function OrderCard({orderId, orderName, totalOrderPrice, orderedAt, orderQuantity}) {
  const navigate = useNavigate();
  
  return (
    <div className='order-card'>
        <div className='order-id'>#{orderId}</div>
        <div className="order-status-btn"><OrderStatusButton orderedAt={orderedAt} /></div>
        <div className='order-name'>{orderQuantity}x {orderName}...</div>
        <div className="footer">
            <div className='view-details' onClick={() => navigate(`${orderId}`)}>View Details</div>
            <div className='price'>₹{totalOrderPrice}</div>
        </div>
    </div>
  )
}

export default OrderCard