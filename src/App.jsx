import { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Profile from './components/Profile/Profile'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import VerifyOTP from './components/Authentication/VerifyOTP'
import ForgotPassword from './components/Authentication/ForgotPassword'
import MyOrders from './components/Orders/MyOrders'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import useThemeStore from './store/themeStore';
import TopBar from './components/Layouts/TopBar';
import Footer from './components/Layouts/Footer';
import GoToTop from './GoToTop';
import OrderDetails from './components/Orders/OrderDetails'
import Checkout from './components/Checkout/Checkout'

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <GoToTop />
      <TopBar />
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
