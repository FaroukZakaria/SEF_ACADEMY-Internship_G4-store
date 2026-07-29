import React from "react";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const EmptyOrders = () =>{
    const navigate = useNavigate();

    return(
            <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center">
        
                    <div
                        className="w-24 h-24 rounded-full
                                    bg-amazon-orange/10
                                    border border-amazon-orange/20
                                    flex items-center justify-center mb-6">
                        <FiPackage
                            size={42}
                            className="text-amazon-orange"/>
                    </div>
        
                    <h2 className="text-3xl font-bold text-amazon-textDark mb-3">
                        No orders yet
                    </h2>
        
                    <p className="text-amazon-textLight text-center max-w-md mb-8">
                        You haven't placed any orders yet.
                        Start shopping to place your first order.
                    </p>
        
                    <button
                        className="bg-amazon-orange hover:bg-amazon-orangeHover
                                    text-white px-8 py-3 rounded-xl
                                    transition-all duration-200" 
                                    onClick={() => navigate("/shop")}>
                        Continue Shopping
                    </button>
        
                </div>
    )
    
};
export default EmptyOrders;