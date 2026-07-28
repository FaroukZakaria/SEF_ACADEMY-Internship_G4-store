import React from "react";

const CheckoutSummary = ({items, subtotal, shipping, tax, total ,
        onPlaceOrder , placingOrder}) => {
        return (
        <div className="bg-amazon-surface border border-amazon-border rounded-xl p-6">

            <h2 className="text-2xl font-semibold text-amazon-textDark mb-6">
                Order Summary
            </h2>

            {/* Products */}

            <div className="space-y-5 border-b border-amazon-border pb-5 
                max-h-[220px] overflow-y-auto">

                {items?.map((item) => (

                    <div
                        key={item._id}
                        className="flex justify-between items-start"
                    >

                        <div className="flex gap-3">

                            <img src={item.image} alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"/>

                            <div>

                                <h3 className="font-medium text-amazon-textDark">
                                    {item.name}</h3>

                                <p className="text-amazon-textLight">
                                    x{item.quantity}
                                </p>

                            </div>

                        </div>

                        <p className="font-semibold">
                            EGP {(item.price * item.quantity).toFixed(0)}
                        </p>

                    </div>

                ))}

            </div>

            {/* Prices */}

            <div className="space-y-3 mt-6">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>EGP {subtotal.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>EGP {shipping.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax (14%)</span>
                    <span>EGP {tax.toFixed(0)}</span>
                </div>

            </div>

            <div className="border-t border-amazon-border mt-5 pt-5 flex justify-between">

                <h3 className="font-bold text-lg">
                    Total
                </h3>

                <h3 className="font-bold text-lg text-amazon-orange">
                    EGP {total.toFixed(0)}
                </h3>

            </div>

            <button type="button" 
                className="w-full mt-6 h-12 rounded-xl bg-amazon-orange
                hover:bg-amazon-orangeHover text-white font-semibold"
                onClick={onPlaceOrder} disabled={placingOrder}>
                {placingOrder ? "Placing..." : "Place Order"}
            </button>

        </div>
    );
    
};
export default CheckoutSummary;