import React from 'react'
import '../assets/css/intro-section.css'
import Button from '../components/Button'

function IntoSection() {
  function scrollTo(){
    document.getElementById('menu-items').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
  }

  return (
    <div className="intro-container">
        <div className="intro-section">
            <div className="content">Flavorsome food right at your door</div>
            <Button styleClasses="secondary" text="Order Now" onClick={scrollTo} isDisabled={false} />
        </div>
    </div>
  )
}

export default IntoSection