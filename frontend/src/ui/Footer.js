import React from 'react'
import '../assets/css/footer.css'

function Footer() {
  return (
    <div className="footer-bottom">
        <div className="links-container">
          <div className="links-heading">
              <div>Follow Us On:</div>
          </div>
          <div className="social-links">
              <a href="https://www.facebook.com/" target="_" className="fb"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/" target="_" className="insta"><i className="fab fa-instagram-square"></i></a>
              <a href="https://www.youtube.com/" target="_" className="yt"><i className="fab fa-youtube"></i></a>
              <a href="https://www.pinterest.com/" target="_" className="pnt"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div className="copyright">
            <h3>@FoodExpress All Rights Reserved</h3>
        </div>
    </div>
  )
}

export default Footer