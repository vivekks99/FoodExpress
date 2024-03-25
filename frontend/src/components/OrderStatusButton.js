import React, { useEffect, useState } from 'react'
import '../assets/css/order-status-btn.css'

const orderStatus = {
  0: 'Preparing Order',
  1: 'Order Dispatched',
  2: 'Order Delivered'
}

const orderStatusClass = {
  0: 'preparing',
  1: 'dispatch',
  2: 'delivered'
}

function OrderStatusButton({ orderedAt }) {
  const [orderStatusCode, setOrderStatusCode] = useState(2);

  useEffect(function () {
    async function fetchOrderStatus() {
      const currentTime = Date.now();
      const timeDifference = Math.floor((currentTime - Date.parse(orderedAt)) / 1000 / 60);
      if (timeDifference < 20) {
        setOrderStatusCode(0)
      }
      else if (timeDifference < 30) {
        setOrderStatusCode(1)
      }
      else {
        setOrderStatusCode(2)
      }
    }
    fetchOrderStatus()
  }, [orderedAt]);

  return (
    <div className={`order-status ${orderStatusClass[orderStatusCode]}`}>{orderStatus[orderStatusCode]}</div>
  )
}

export default OrderStatusButton