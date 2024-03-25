import React from 'react'
import { BASE_URL, MENU_URL } from '../constants';
import '../assets/css/menuitems.css'
import Cards from '../components/Cards';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetchMenu from '../hooks/useFetchMenu';

function MenuItems() {
  const [menuItems, isLoading, errorMessage, errorStatus, errorStatusText] = useFetchMenu(`${BASE_URL}${MENU_URL}`);

  return (
    <>
    
    <div id='menu-items' className="menuitems-container">
      {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> : <>
        <div className="header">OUR MENU</div>
        {menuItems?.data?.length === 0 ? <p className='no-items'>No Items Found</p> :
        <Cards menu={menuItems?.data} imgPath={'/images/menu'} />}
      </>}
    </div>
    </>
  )
}

export default MenuItems