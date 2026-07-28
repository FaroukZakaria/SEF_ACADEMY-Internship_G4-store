import React from "react";

const OrderNoteSkeleton = () =>{
    return(
        <div className="bg-amazon-surface animate-pulse border border-amazon-border rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full
                                    bg-amazon-bg animate-pulse "></div>
                
                                <div>
                                    <div className="w-32 h-6 bg-amazon-bg animate-pulse"></div>
                                </div>
                            </div>
        
                            <div className="w-full rounded-xl h-30 bg-amazon-bg animate-pulse"></div>
                        </div>
    )

}
export default OrderNoteSkeleton;