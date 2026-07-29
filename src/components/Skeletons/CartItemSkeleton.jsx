import React from "react";

const CartItemSkeleton = () =>{
    return(
        <div className="border-amazon-border">
                    <div className="w-full py-6 px-4 flex justify-between items-center gap-2">
                        <div className="flex gap-4 items-center">
                            <div className="w-24 h-24 object-cover rounded bg-amazon-bg"></div>
        
                        <div>
                            <div className="w-50 h-7 bg-amazon-bg rounded"></div>
                            <p className="w-30 h-5 bg-amazon-bg mt-2 mb-4"></p>
                            <div className="flex gap-4 mt-2">
                                <div className="rounded w-7 h-7 flex items-center 
                                    justify-center cursor-pointer bg-amazon-bg">
                                    
                                </div>
        
                                <div className="w-6 h-5 bg-amazon-bg"></div>
        
                                <div className="rounded w-7 h-7 flex items-center 
                                    justify-center cursor-pointer bg-amazon-bg">
                                    
                                </div>
        
                            </div>
        
                        </div>
                        </div>
                        
        
                        <div className="flex flex-col items-end">
                            <div className="mb-8 bg-amazon-bg w-5 h-5 rounded">
                                
                            </div>
        
                            <div className="w-16 h-5 rounded bg-amazon-bg"></div>
                        </div>
        
                    </div>
                </div>
    )

};
export default CartItemSkeleton;