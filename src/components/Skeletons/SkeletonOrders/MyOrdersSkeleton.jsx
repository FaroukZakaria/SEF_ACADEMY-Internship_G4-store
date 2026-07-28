import React from "react";
import OrderCardSkeleton from "./OrderCardSkeleton";

const MyOrdersSkeleton = () =>{
    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="font-bold text-3xl mx-45 text-amazon-textDark 
                mt-5 mb-10 ">My Orders</h1>

            <div>
                {Array.from({ length: 3 }).map((_, index) => (
                            <OrderCardSkeleton key={index} />))}


            </div>

        </div>
    )

}
export default MyOrdersSkeleton;