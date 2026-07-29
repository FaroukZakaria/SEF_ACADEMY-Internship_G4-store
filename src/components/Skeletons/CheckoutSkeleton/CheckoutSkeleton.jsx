import React from "react";
import ShippingFormSkeleton from "./ShippingFormSkeleton";
import PaymentMethodSkeleton from "./PaymentMethodSkeleton";
import OrderNoteSkeleton from "./OrderNoteSkeleton";
import CheckoutSummarySkeleton from "./CheckoutSummarySkeleton";

const CheckoutSkeleton = () =>{
    return(

        <div className="max-w-7xl mx-auto px-4 py-8 bg-amazon-bg">

            <div className="w-32 h-8 bg-amazon-surface rounded mb-8"></div>

            <div className="flex flex-col lg:flex-row gap-8 bg-amazon-bg w-full h-auto">

                <div className="lg:w-2/3 space-y-6"> 
                    
                    <ShippingFormSkeleton />
                    <PaymentMethodSkeleton />
                    <OrderNoteSkeleton />
                </div>

            <div className="lg:w-1/3">
                    <div className="sticky top-6">
                        <CheckoutSummarySkeleton />
                    </div>
            </div>

        </div>

    </div>

    )
}
export default CheckoutSkeleton;