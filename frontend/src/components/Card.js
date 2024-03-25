import React from 'react'
import '../assets/css/card.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { addItem, decreaseCart, deleteItem, getCart, increaseCart } from '../slices/cartSlice';

function Card({item, imgPath}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const dispatch = useDispatch()
  const cart = useSelector(getCart);
  const isItemInCart = cart.find(i => i._id === item._id);

  function handleCardClick(endpoint){
    if(pathname !== '/') return;
    navigate(`/menu${endpoint}`);
  }

  function handleAddToCart(){
    const updatedItem = {
      ...item,
      quantity: 1,
      totalPrice: item.price * 1
    }
    dispatch(addItem(updatedItem));
  }

  if(pathname === '/'){
    return (
      <>
          <div className="cards menu-item" onClick={() => handleCardClick(item?.endpoint)}>
            <img src={`${imgPath}${item?.image}`} alt="" className="pic" />
            <div className="card-content">
              <h1 className="title">{item?.name}</h1>
              <p className="description">{item?.description}</p>
            </div>
          </div>
      </>
    )
  }

  return (
    <>
        <div className="cards" onClick={() => handleCardClick(item?.endpoint)}>
          <img src={`${imgPath}${item?.image}`} alt="" className="pic" />
          <div className="card-content">
            <h1 className="title">{item?.name}</h1>
            <p className="description">{item?.description}</p>
            <div className="card-footer">
              {item?.price && <p className="price">₹ {item.price}</p>}
              {isItemInCart ? 
              <div className='already-in-cart'>
                <div className='icons rounded operator' onClick={() => dispatch(decreaseCart(item?._id))}><i className="fas fa-minus"></i></div>
                <div className='icons rounded quantity'>{isItemInCart.quantity}</div>
                <div className='icons rounded operator' onClick={() => dispatch(increaseCart(item?._id))}><i className="fas fa-plus"></i></div>
                <div className='icons rounded trash' onClick={() => dispatch(deleteItem(item?._id))}><i className="fas fa-trash"></i></div>
              </div> 
              : 
              <Button text='Add to Cart' onClick={() => handleAddToCart()} />}
            </div>
          </div>
        </div>
    </>
  )
}

export default Card