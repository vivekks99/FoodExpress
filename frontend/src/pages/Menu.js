import React from 'react'
import { useParams } from 'react-router-dom';
import '../assets/css/menuitems.css'
import Cards from '../components/Cards';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetchMenu from '../hooks/useFetchMenu';
import { BASE_URL, MENU_URL } from '../constants';

function Menu() {
  const {category} = useParams();

  const [menu, isLoading, errorMessage, errorStatus, errorStatusText] = useFetchMenu(`${BASE_URL}${MENU_URL}/${category}`);
  
  return (
    <>
    {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> :
    <div id='menu' className="menuitems-container">
        <div className="header">{menu?.data?.[0]?.category}</div>
        {menu?.data?.length === 0 ? <p className='no-items'>No Items Found</p> :
        <Cards menu={menu?.data} imgPath={'/images'} />}
    </div>}
    </>
  )
}

export default Menu