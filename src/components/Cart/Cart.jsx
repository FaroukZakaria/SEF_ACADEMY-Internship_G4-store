import React from "react";
import CartItem from "./CartItem";
import CouponForm from "./CouponForm";
import OrderSummary from "./OrderSummary";
import { FiArrowLeft , FiShoppingCart  } from "react-icons/fi";
import { useState , useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CartSkeleton from "../Skeletons/CartSkeleton";
import useShopStore from "../../store/shopStore";

const Cart = () =>{

    const navigate = useNavigate();
    const [cartItems , setCartItems] = useState([]);
    const [loading , setLoading] = useState(true);
    
    const [couponLoading, setCouponLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    const [couponCode, setCouponCode] = useState("");
    const [cartSummary, setCartSummary] = useState(null);
    
    const token = localStorage.getItem("token");

    const cart = useShopStore((s) => s.cart);
    const setCart = useShopStore((s) => s.setCart);


    const getCart = async () =>{
            try {
                setLoading(true)
                const response = await axios.get(
                    "https://e-commerce-api-3wara.vercel.app/carts" , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCartItems(response.data.items);
                setCartSummary(response.data);

            }catch(error){
                toast.error("Failed to load cart. Please try again");
            }finally{
                setLoading(false)
            }
        }

        const applyCoupon = async () =>{
            try{
                setCouponLoading(true);
                const response = await axios.post(
                        "https://e-commerce-api-3wara.vercel.app/carts/coupon",
                        {
                        code: couponCode.trim().toUpperCase(),
                        },
                        {
                            headers: {
                            Authorization: `Bearer ${token}`,
                            },
                        }
                        
                );
                toast.success(response.data.message);

                
                setCouponCode("");

                await getCart();

            }catch(error){
                toast.error(error.response?.data?.message || "Invalid coupon");

            }finally{
                setCouponLoading(false);
            }
        }


        const removeCoupon = async () =>{
            try{
                setRemoveLoading(true);
                const response = await axios.delete(
                "https://e-commerce-api-3wara.vercel.app/carts/coupon",
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
                toast.success("Coupon removed");

                

                await getCart();


            }catch(error){
                toast.error("Failed to remove coupon");
            }finally{
                setRemoveLoading(false);
            }
            
        }



    useEffect(() => {
        getCart()
        }, []);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0 );
        const shipping  = 50;

        const discountedSubtotal = (cartSummary?.subtotal || subtotal) -
                                (cartSummary?.discountAmount || 0);

        const tax = discountedSubtotal * 0.14;

        const total = subtotal + shipping  + tax ;

        if(loading){
            return(
                <CartSkeleton />
            )
        }


        if (cartItems.length === 0) {

            return(
                    <div className="max-w-7xl mx-auto py-20 flex flex-col 
                        items-center justify-center">

            <div
                className="w-24 h-24 rounded-full
                            bg-amazon-orange/10
                            border border-amazon-orange/20
                            flex items-center justify-center mb-6">
                <FiShoppingCart
                    size={42}
                    className="text-amazon-orange"/>
            </div>

            <h2 className="text-3xl font-bold text-amazon-textDark mb-3">
                Your cart is empty
            </h2>

            <p className="text-amazon-textLight text-center max-w-md mb-8">
                Looks like you haven't added anything to your cart yet.
                Start shopping and find something you love!
            </p>

            <button
                className="bg-amazon-orange hover:bg-amazon-orangeHover
                            text-white px-8 py-3 rounded-xl
                            transition-all duration-200" onClick={() => navigate("/shop")}>
                Continue Shopping
            </button>

        </div>
            );
            
        };


        const increaseQuantity = async (productId, quantity) => {
            try{
                const response = await axios.patch(
                "https://e-commerce-api-3wara.vercel.app/carts/items",
                {
                    productId: productId,
                    quantity: quantity + 1,
                },
                {
                headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            
            setCartItems(response.data.items);
            setCartSummary(response.data);
            setCart(response.data);

            }catch(error){
                toast.error("Failed to increase quantity")
            }

        }

        const decreaseQuantity = async (productId, quantity) =>{
            try{
                if(quantity === 1){
                await deleteItem(productId);

                }else{
                    const response = await axios.patch(
                        "https://e-commerce-api-3wara.vercel.app/carts/items",
                        {
                            productId,
                            quantity: quantity - 1,
                        },
                        {
                            headers: {
                            Authorization: `Bearer ${token}`,
                },})
                setCartItems(response.data.items);
                setCartSummary(response.data);
                setCart(response.data)
        }

            }catch(error){
                toast.error("Failed to decrease quantity")
            }

        }


        const deleteItem = async (productId) => {
            try{
                const response =await axios.delete(
                    `https://e-commerce-api-3wara.vercel.app/carts/items/${productId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },

                    }

                );
                setCartItems(response.data.items);
                setCartSummary(response.data);
                setCart(response.data)

            }catch(error){
                toast.error("Failed to remove item")

            }
            
        };


        return (

            
            <div className="max-w-7xl mx-auto px-4 py-8">

                <h1 className="font-bold text-3xl  
                    text-amazon-textDark mt-10 mb-10 ">Shopping Cart</h1>
                
                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="w-full lg:w-2/3">
                        <div className="bg-amazon-surface border 
                                border-amazon-border rounded-xl p-6">

                            {cartItems.map((item , index) => (
                                <CartItem key={item._id} item={item}
                                    isLast={index === cartItems.length -1}
                                    increaseQuantity={increaseQuantity}  
                                    decreaseQuantity={decreaseQuantity}
                                    deleteItem={deleteItem}/>
                            ))}

                        </div>
                        
                        <div className="bg-amazon-surface border border-amazon-border 
                                rounded-xl mt-4 p-6">
                            <CouponForm 
                                couponCode={couponCode}
                                setCouponCode={setCouponCode}
                                applyCoupon={applyCoupon}
                                couponApplied={!!cartSummary?.coupon}
                                coupon={cartSummary?.coupon}
                                removeCoupon={removeCoupon}
                                couponLoading={couponLoading}
                                removeLoading={removeLoading} />
                            
                        </div>
                        <button className="bg-amazon-bg w-50 flex items-center 
                            gap-2 px-5 pt-5 cursor-pointer" onClick={() => navigate("/shop")}>
                                    <FiArrowLeft size={15} /> Continue Shopping
                                
                            </button>
                        
                    </div>
                

                <div className="w-full lg:w-1/3 bg-amazon-surface rounded-lg  
                                border border-amazon-border p-6">
                    <OrderSummary
                        subtotal={cartSummary?.subtotal || subtotal}
                        shipping={shipping} tax={tax}
                        total={cartSummary?.total || total}
                        discount={cartSummary?.discountAmount || 0}
                        coupon={cartSummary?.coupon} />
                </div>

                </div>
                
            </div>
        )
    };

    export default Cart;