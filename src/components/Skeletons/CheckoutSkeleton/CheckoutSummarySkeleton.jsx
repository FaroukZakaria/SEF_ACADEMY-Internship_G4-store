import React from "react";

const CheckoutSummarySkeleton = () =>{
    return(
        <div className="bg-amazon-surface animate-pulse rounded-xl p-6">

            <div className="w-32 h-8 rounded-lg mb-6 bg-amazon-bg"></div>

            {/* Products */}

                <div className="space-y-5 pb-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex justify-between items-start pb-5">
                            <div className="flex gap-3">
                                <div className="w-16 h-8 rounded-lg shimmer"></div>

                            <div className="space-y-2">
                                <div className="w-32 h-4 rounded shimmer"></div>
                                <div className="w-16 h-3 rounded shimmer"></div>
                            </div>
                        </div>

                    <div className="w-16 h-4 rounded shimmer"></div>
                </div>
                ))}
            </div>


            {/* Prices */}

            <div className="space-y-3 mt-6 bg-amazon-surface">

                <div className="flex justify-between">
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                </div>

                <div className="flex justify-between">
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                </div>

                <div className="flex justify-between">
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                    <div className="w-16 h-8 rounded-lg bg-amazon-bg"></div>
                </div>

            </div>

            <div className="bg-amazon-surface mt-5 pt-5 flex 
                justify-between">

                <div className="w-10 h-9 rounded-lg bg-amazon-bg"></div>

                <div className="w-10 h-9 rounded-lg bg-amazon-bg"></div>

            </div>

            <div className="w-full mt-6 h-12 rounded-xl bg-amazon-bg"></div>

        </div>
    )

}
export default CheckoutSummarySkeleton;