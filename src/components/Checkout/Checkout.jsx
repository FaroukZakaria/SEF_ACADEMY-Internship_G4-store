import React from "react";
import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import OrderNote from "./OrderNote";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSkeleton from "../Skeletons/checkoutSkeleton/CheckoutSkeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () =>{
    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);
    const [errors , setErrors] = useState({});
    const [placingOrder,setPlacingOrder]=useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const getCart = async () => {
        try {

            setLoading(true);
            const response = await axios.get(
                    "https://e-commerce-api-3wara.vercel.app/carts",
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    }
            );

        setCart(response.data);

        } catch (error) {

            toast.error("Failed to load cart");

        } finally {

            setLoading(false);

        }
    };

    const [checkoutData, setCheckoutData] = useState({
        shippingAddress: {
        fullName: "",
        phone: "",
        country: "Egypt",
        city: "",
        address: "",
        postalCode:"",
    },
    paymentMethod: "cash",
    customerNote: "",
});

    const validateForm = () =>{
        const newErrors = {};

        if (!checkoutData.shippingAddress.fullName.trim()) {
            newErrors.fullName = "Full Name is required" ;
        }

        if (!checkoutData.shippingAddress.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (!checkoutData.shippingAddress.country.trim()) {
            newErrors.country = "Country is required" ;
        }

        if (!checkoutData.shippingAddress.city.trim()) {
            newErrors.city = "City is required" ;
        }

        if (!checkoutData.shippingAddress.address.trim()) {
            newErrors.address = "Address is required";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handlePlaceOrder = async () =>{
        
            
            if (!validateForm()) {
            return
        }
        try{
            setPlacingOrder(true);
            

            const { customerNote, ...orderData } = checkoutData;

            const response = await axios.post(
                "https://e-commerce-api-3wara.vercel.app/orders",
                orderData,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );

        setCheckoutData({shippingAddress:{
            fullName:"",
            phone:"",
            country:"Egypt",
            city:"",
            address:"",
            postalCode:"",
        },
        paymentMethod:"cash",
        notes:"",
    });
    navigate("/orders");
        toast.success("Order placed successfully");
        await getCart();

        }catch(error){
            toast.error("We couldn't place your order. Please try again")
        }
        finally{
            setPlacingOrder(false);
        }
        
    }

    useEffect(() => {

        getCart();

    }, []);


    if (loading) {
        return(
            <CheckoutSkeleton />
        )

    }

    if (!cart) {

        return null;

    }
    

    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8"> Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left */}
            <form className="lg:w-2/3 space-y-6">
                <ShippingForm checkoutData={checkoutData} setCheckoutData={setCheckoutData}
                            errors={errors} setErrors={setErrors}/>

                <PaymentMethod checkoutData={checkoutData}
                                setCheckoutData={setCheckoutData} />

                <OrderNote checkoutData={checkoutData}
                            setCheckoutData={setCheckoutData}/>
        </form>
        

                {/* Right */}

            <div className="lg:w-1/3">
                <div className="sticky top-6">
                    <CheckoutSummary items={cart.items} subtotal={cart.subtotal}
                        shipping={50} tax={cart.subtotal * 0.14} total={cart.total}
                        onPlaceOrder={handlePlaceOrder} placingOrder={placingOrder}/>
                </div>
            </div>

        </div>

    </div>
    )

};
export default Checkout;