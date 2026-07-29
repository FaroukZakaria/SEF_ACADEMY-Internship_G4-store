import React from "react";


const OrderDetailsSkeleton = () =>{
    return(
    <div className="max-w-5xl bg-amazon-bg mx-auto px-4 py-8">

                            {/* Header */}
            <div className="flex justify-between items-start mb-8">

                <div>
                    <div className="h-8 w-56 rounded bg-amazon-surface animate-pulse"></div>

                    <div className="mt-3 h-4 w-32 rounded bg-amazon-surface animate-pulse"></div>
                </div>

                <div className="w-24 h-8 rounded-full bg-amazon-surface animate-pulse"></div>

        </div>

                    {/* Order Progress */}
                
                    <div className="h-24 bg-amazon-surface rounded-2xl animate-pulse mb-6"></div>

                    {/* Items */}

        <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6 mb-6">

            <div className="flex items-center bg-amazon-surface gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-amazon-bg animate-pulse"></div>
                <div className="h-6 w-36 rounded bg-amazon-bg animate-pulse"></div>
            </div>

        <div className="space-y-5 bg-amazon-surface">
            
        <div className="flex justify-between bg-amazon-surface items-center">

            <div className="flex items-center bg-amazon-surface gap-4">

                <div className="w-16 h-16 rounded-xl bg-amazon-bg animate-pulse"></div>

                <div>
                    <div className="h-6 w-36 mb-4 rounded bg-amazon-bg animate-pulse"></div>

                    <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>
                </div>

            </div>

            <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>

        </div>

    </div>

        </div>

            {/* Bottom */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6">

                <div className="flex items-center bg-amazon-surface gap-2 mb-6">
                    <div className="w-6 h-6 rounded bg-amazon-bg animate-pulse"></div>
                    <div className="h-6 w-36 rounded bg-amazon-bg animate-pulse"></div>
                </div>

            <div className="space-y-2 text-amazon-textLight">

                <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>

                <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>

                <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>

                <div className="h-4 w-40 rounded bg-amazon-bg animate-pulse"></div>

            </div>

        </div>


            <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6">

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 rounded bg-amazon-bg animate-pulse"></div>

                    <div className="h-6 w-36 rounded bg-amazon-bg animate-pulse"></div>
                </div>

                <div>

                    <div>

                        <div className="h-4 w-20 rounded bg-amazon-bg animate-pulse"></div>
                    </div>
                
                <div className="flex items-center justify-between gap-6">
                    <div className="h-4 w-20 mb-4 rounded bg-amazon-bg animate-pulse"></div>

                    <div className="h-4 w-20 mb-4 rounded bg-amazon-bg animate-pulse"></div>
                </div>

                <div className="flex items-center w-40 h-4 font-medium bg-amazon-bg text-sm">
                    <div className=" rounded bg-amazon-bg animate-pulse"></div>

                    <div className=" rounded bg-amazon-bg animate-pulse"></div>
                </div>

            </div>


        </div>

    </div>
                                    {/* Cancel Button */}
                
                        <div className="flex justify-center mt-8">
                            <div className="w-40 h-12 rounded-xl 
                                bg-amazon-surface animate-pulse"></div>
                        </div>
    </div>
    )

};
export default OrderDetailsSkeleton;