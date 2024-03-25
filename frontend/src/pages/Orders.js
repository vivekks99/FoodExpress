import React, { useEffect, useState } from 'react'
import '../assets/css/orders.css'
import { BASE_URL, USER_URL } from '../constants';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import OrderCard from '../components/OrderCard';

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [errorStatus, setErrorStatus] = useState(500);
  const [errorStatusText, setErrorStatusText] = useState('No Internet');

  useEffect(function(){
    async function fetchUserOrders(){
        try{
          const res = await fetch(`${BASE_URL}${USER_URL}/orders`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
          });
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
    fetchUserOrders();
  }, []);

  return (
    <>
    {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> : 
    <div className='order-container'>
      <div className="header">Your Orders</div>
      <>
        {orderDetails.length === 0 ? <div className='no-orders'>You Don't Have Any Orders Yet</div> :
        <div className="order-card-container">
          {orderDetails?.map(item => (
            <OrderCard key={item._id} orderId={item?._id} orderName={item?.orders?.[0]?.orderName} totalOrderPrice={item?.totalOrderPrice} orderedAt={item?.orderedAt} orderQuantity={item?.orders?.[0]?.quantity} />
          ))}
        </div>}
      </>
    </div>}
    </>
  )
}

export default Orders