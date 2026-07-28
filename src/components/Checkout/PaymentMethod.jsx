import React from "react";
import { FiCreditCard } from "react-icons/fi";

const PaymentMethod = ({ checkoutData, setCheckoutData }) =>{

    const handleChange = (e) =>{
        setCheckoutData((prev)=>({
            ...prev,
            paymentMethod:e.target.value,
        }));

    };

    return(
        <div className="bg-amazon-surface border border-amazon-border rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center ">
                    <FiCreditCard size={22} className="text-amazon-orange"/>
                </div>

                <div>
                    <h2 className="text-lg font-bold 
                        text-amazon-textDark "> Payment Method</h2>
                </div>
            </div>

            <div  onClick={() => setCheckoutData((prev) => ({
                                    ...prev,
                                    paymentMethod: "cash",
                                }))}
                className={`cursor-pointer h-20 rounded-xl border p-4 transition-all duration-200
                    ${checkoutData.paymentMethod === "cash" 
                    ? "border-amazon-orange bg-amazon-orange/10 ring-2 ring-amazon-orange/20"
                    : "border-amazon-border"}`}>


                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-full bg-amazon-orange/10
                                    flex items-center justify-center mb-5 ">
                                        <FiCreditCard size={22} 
                                        className="text-amazon-orange"/>
                            </div>

                            <div>

                                <h3 className="text-lg font-semibold text-amazon-textDark">
                                    Cash on Delivery
                                </h3>

                                <p className="text-sm font-semibold 
                                    text-amazon-textLight mb-6">
                                        Pay when your order arrives</p> 

                            </div>

                        </div>
            </div>
        </div>
    )
};
export default PaymentMethod;