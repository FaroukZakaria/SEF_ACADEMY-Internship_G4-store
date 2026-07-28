
import React from "react";
import { useNavigate } from "react-router-dom";


const OrderSummary = ({ subtotal, shipping, tax, total , discount ,coupon }) =>{
    const navigate = useNavigate();
    return (
        <div className=" p-3 min-h-[410px]">
            <h2 className="text-xl font-semibold text-amazon-textDark">Order Summary</h2>

            <div className="flex justify-between  mt-5 border-b border-amazon-border mb-5 ">
                <div>
                    <p className="mb-2 text-md font-semibold 
                        text-amazon-textLight">Subtotal</p>

                        {discount > 0 && (
                            <p className="text-green-600">
                                Discount ({coupon})
                            </p>
                        )}


                    <p className="mb-2 text-md font-semibold 
                        text-amazon-textLight">Shipping</p>

                    <p className="mb-2 text-md text-amazon-textLight 
                        text-sm">Free shipping on orders over EGP 1,000</p>

                    <p className="mb-3 text-md font-semibold 
                        text-amazon-textLight">Tax (14%)</p>
                </div>
                <div>
                    <p className="mb-2 text-md font-semibold 
                        text-amazon-textLight">EGP {subtotal.toFixed(0)}</p>

                        {discount > 0 && (
                            <p className="text-green-600">
                                    -EGP {discount.toFixed(0)}
                            </p>
                        )}

                    <p className="text-md mb-10 font-semibold 
                        text-amazon-textLight ">EGP {shipping.toFixed(0)}</p>

                    <p className="mb-3 text-md font-semibold 
                        text-amazon-textLight">EGP {tax.toFixed(0)}</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div> <p className="text-md font-bold 
                    text-amazon-textDark">Total</p></div>

                <div > <p className="text-md font-bold 
                    text-amazon-orange">EGP {total.toFixed(0)}</p></div>
            </div>

            <div>
                <button className="bg-amazon-orange text-white w-full h-11
                        rounded-xl mt-5 mb-3 hover:bg-amazon-orangeHover" 
                        onClick={() => navigate("/checkout")}>
                            Proceed to Checkout</button>
                        <div className="flex justify-center">
                            <button className="text-md text-amazon-orange text-center
                            cursor-pointer" onClick={() => navigate("/shop")} >
                                Continue Shopping</button>
                        </div>
            </div>
        </div>
    )
};
export default OrderSummary;