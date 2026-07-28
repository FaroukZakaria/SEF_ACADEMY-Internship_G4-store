import React from "react";
import CartItemSkeleton from "./CartItemSkeleton";
import CouponFormSkeleton from "./CouponFormSkeleton";
import OrderSummarySkeleton from "./OrderSummarySkeleton";


const CartSkeleton = () =>{
    return (

        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">

            <div className="h-10 w-60 bg-amazon-surface rounded-lg mb-8 animate-pulse"></div>
                
                <div className="flex flex-col lg:flex-row gap-6 animate-pulse">

                    <div className="w-full lg:w-2/3 animate-pulse">
                        <div className="bg-amazon-surface border border-amazon-border 
                            rounded-xl p-6 animate-pulse">

                        {Array.from({ length: 3 }).map((_, index) => (
                            <CartItemSkeleton key={index} />))}

                        </div>
                        
                        <div className="bg-amazon-surface border border-amazon-border 
                            rounded-xl mt-4 p-6 animate-pulse">
                            <CouponFormSkeleton />
                            
                        </div>
                        <div className="w-50 h-11 bg-amazon-surface 
                            rounded flex items-center gap-2 px-5 pt-5 animate-pulse ">
                                
                            </div>
                        
                    </div>
                

                <div className="w-full lg:w-1/3 bg-amazon-surface rounded-lg  
                    border border-amazon-border p-6 animate-pulse">
                    <OrderSummarySkeleton />
                </div>

                </div>
                
            </div>
        )

};
export default CartSkeleton;