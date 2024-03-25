import React from 'react'
import '../assets/css/error.css'

function ErrorMessage({errorStatus=404, errorStatusText="Not Found", message="This page does not exists"}) {
    return (
        <div className='error-container'>
          <h1>{errorStatus} {errorStatusText}</h1>
          <div className="error-content">
            <p>{message}</p>
          </div>
        </div>
      )
}

export default ErrorMessage