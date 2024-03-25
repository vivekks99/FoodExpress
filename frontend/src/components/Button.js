import React from 'react'
import '../assets/css/button.css'

function Button({styleClasses, text, onClick, isDisabled}) {
  return (
    <button className={`btn ${styleClasses}`} onClick={() => onClick()} disabled={isDisabled}>{text}</button>
  )
}

export default Button