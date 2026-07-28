import React from "react";


const OrderCardSkeleton = () =>{

    return(

        <div className="animate-pulse bg-amazon-surface w-full max-w-5xl
                        mx-auto h-30 m-auto flex p-7 justify-between items-center
                    rounded-2xl border border-amazon-border mb-5">

            <div>

                <div className="w-20 h-5 bg-amazon-bg rounded mb-3"></div>

                <div className="w-20 h-4 bg-amazon-bg rounded mb-3"></div>

                <div className="w-10 h-4 bg-amazon-bg rounded"></div>

            </div>

            <div className="text-right flex items-center gap-2">

            <div className="w-15 h-6 bg-amazon-bg rounded mb-3"></div>

            <div className="w-3 h-6 bg-amazon-bg rounded-full"></div>

        </div>


    </div>
    )

};
export default OrderCardSkeleton;