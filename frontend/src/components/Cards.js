import React from 'react'
import Card from './Card';
import '../assets/css/cards.css'

function Cards({menu, imgPath}) {
    return (
    <div className='cards-container'>
        {menu?.map(item => (
            <Card item={item} imgPath={imgPath} key={item?._id} />
        ))}
    </div>
  )
}

export default Cards