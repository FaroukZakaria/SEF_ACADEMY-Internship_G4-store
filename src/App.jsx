import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Profile from './components/Profile/Profile'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import VerifyOTP from './components/Authentication/VerifyOTP'
import ForgotPassword from './components/Authentication/ForgotPassword'
import Shop from './components/Shop'
import MyOrders from './components/Orders/MyOrders'
import Cart from './components/Cart/Cart'
import OrderDetails from './components/Orders/OrderDetails'
import Checkout from './components/Checkout/Checkout'
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
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
