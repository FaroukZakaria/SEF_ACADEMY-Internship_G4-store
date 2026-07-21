import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import VerifyOTP from './components/Authentication/VerifyOTP'
import ForgotPassword from './components/Authentication/ForgotPassword'
import Shop from './components/Shop'
import MyOrders from './components/MyOrders'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
