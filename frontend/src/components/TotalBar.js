import React from 'react'
import '../assets/css/total-bar.css'

function TotalBar({totalPrice, totalQuantity}) {
  return (
    <div className="total">
        <div>Total ({totalQuantity})</div>
        <div>₹{totalPrice}</div>
    </div>
  )
}

export default TotalBar