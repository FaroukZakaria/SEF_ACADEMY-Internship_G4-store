
import React from "react";
import {  FiTag, FiX , FiCheckCircle } from "react-icons/fi";

const CouponForm = ({couponCode, setCouponCode, applyCoupon,couponLoading, couponApplied,
                        coupon, removeCoupon , removeLoading }) => {
    return (
        <div className="rounded">
            <h2 className="mb-3 flex gap-3 items-center font-semibold text-md">
                <FiTag size={18} /> Coupon Code
            </h2>

            {couponApplied ? (
                <div className="flex items-center justify-between bg-green-50 
                border border-green-400 rounded-xl px-4 py-3 w-full shadow-sm">

                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <FiCheckCircle size={20} />
                        <span>Coupon "{coupon}" applied</span>
                    </div>

                    <button type="button" onClick={removeCoupon} 
                            disabled={removeLoading}
                            className={`w-8 h-8 flex items-center justify-center 
                            text-red-500 rounded-full hover:bg-red-100  hover:text-red-700
                            transition cursor-pointer mr-4 ${removeLoading ? 
                                "opacity-50 cursor-not-allowed" : ""}`}>
                            {removeLoading ? "Removing.. " : <FiX size={18} />}
                    </button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 h-11 px-4 border border-amazon-border rounded-lg
                        shadow-sm bg-amazon-surface outline-none transition-all duration-200
                        focus:border-amazon-orange focus:ring-4
                        focus:ring-amazon-orange/20 focus:shadow-lg"
                    />

                    <button type="button" 
                        onClick={applyCoupon} disabled={couponLoading}
                        className="w-28 shrink-0 h-11 rounded-lg border border-amazon-border
                        bg-amazon-surface font-medium transition-all duration-200
                        border-amazon-orange font-semibold
                        shadow-sm hover:shadow-md
                        text-amazon-orange
                        focus:outline-none hover:ring-4
                        hover:ring-amazon-orange/15
                        hover:border-amazon-orange active:scale-95">
                        {couponLoading ? "Applying..." : "Apply"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CouponForm;