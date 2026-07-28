import React from "react";
import { FiFileText  } from "react-icons/fi";

const OrderNote = ({ checkoutData, setCheckoutData }) =>{
    const onChange = (e) =>{
    setCheckoutData((prev) => ({
        ...prev,
        customerNote: e.target.value,
    }))
}

    return(
        <div className="bg-amazon-surface border border-amazon-border rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center ">
                            <FiFileText  size={22} className="text-amazon-orange"/>
                        </div>
        
                        <div>
                            <h2 className="text-lg font-bold 
                                text-amazon-textDark ">Order Notes (Optional)</h2>
                        </div>
                    </div>

                    <div>
                        <textarea rows={5} placeholder="Any Special instructions for your order..."
                            maxLength={300} value={checkoutData.customerNote || ""}
                            onChange={onChange} className="outline-none w-full 
                            rounded-xl p-3 text-amazon-textLight border border-amazon-border 
                            text-sm font-semibold transition-all duration-200 resize-none
                            focus:border focus:border-amazon-orange focus:bg-amazon-orange/10 
                            focus:ring-2 focus:ring-amazon-orange/20"/>

                    </div>
                </div>
    )

}
export default OrderNote;