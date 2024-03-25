import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import ErrorMessage from './components/ErrorMessage'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menu/:category' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:orderId' element={<OrderDetails />} />
          <Route path='*' element={<ErrorMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App