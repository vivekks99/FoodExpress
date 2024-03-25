import React, { useEffect, useState } from 'react'
import '../assets/css/order-details.css'
import { useParams } from 'react-router-dom';
import { BASE_URL, ORDER_URL } from '../constants';
import Spinner from '../components/Spinner';
import OrderItem from '../components/OrderItem';
import TotalBar from '../components/TotalBar';
import OrderStatusButton from '../components/OrderStatusButton';
import ErrorMessage from '../components/ErrorMessage';

function getDateAndTime(date){
  var dateObject = new Date(date);
  
  var day = dateObject.getDate();
  var month = dateObject.getMonth() + 1;
  var year = dateObject.getFullYear();
  
  var hours = dateObject.getHours();
  var minutes = dateObject.getMinutes();

  return (day < 10 ? '0' : '') + day + '/' +( month < 10 ? '0' : '') + month + '/' + year + ' ' + hours + ':' + minutes
}

function OrderDetails() {
  const {orderId} = useParams('orderId');
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState(500);
  const [errorStatusText, setErrorStatusText] = useState('No Internet');

  useEffect(function(){
    async function fetchOrderDetails(){
      try{
        const res = await fetch (`${BASE_URL}${ORDER_URL}/${orderId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
        });
        console.log(res);
        if(!res.ok){
          setErrorStatus(res.status);
          setErrorStatusText(res.statusText);
        }
        const data = await res.json();
        console.log(data);
        if(data.status === 'error') throw new Error('Something went wrong, Please come back later!');
        if(data.status === 'fail') throw new Error(data.message);
        setOrderDetails(data.data);
      }
      catch(err){
        setErrorMessage(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  useEffect(function(){
    async function fetchTimeLeft(){
      const currentTime = Date.now();
      const timeDifference = Math.floor((currentTime - Date.parse(orderDetails?.orderedAt))/1000/60);
      setTimeLeft(30 - timeDifference);
    }
    fetchTimeLeft();
  }, [orderDetails?.orderedAt]);

  return (
    <>
    {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> : 
    <div className="order-details-container">
        <div className='order-header'>
          <div className="order-id">Order ID: #{orderDetails?._id}</div>
          <OrderStatusButton orderedAt={orderDetails?.orderedAt} />
        </div>
        {timeLeft > 0 && <div className="time-left">Only {timeLeft} minutes left</div>}
        <div className="order-time">
          <div className="header">Ordered At</div>
          <div className='content'>{getDateAndTime(orderDetails?.orderedAt)}</div>
        </div>
        <div className='order-address'>
          <div className="header">Address</div>
          <div className='content'>{orderDetails?.deliveryAddress}</div>
        </div>
        <div className="item-details">
          <div className="header">Item Details</div>
          {orderDetails?.orders?.map(item => (
            <OrderItem key={item?._id} quantity={item?.quantity} name={item?.orderName} totalPrice={item?.orderPrice} />
        ))}
        </div>
        <TotalBar totalPrice={orderDetails?.totalOrderPrice} totalQuantity={orderDetails?.totalOrderQuantity} />
        <div className='order-payment'>
          <div className="header">Paid Via</div>
          <div className='content'>{orderDetails?.paymentMode}</div>
        </div>
    </div>}
    </>
  )
}

export default OrderDetails