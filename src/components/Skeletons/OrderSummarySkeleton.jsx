import React from "react";

const OrderSummarySkeleton = () => {
    return (
        <div className=" p-3 min-h-[410px]">
            <div className="w-40 h-7 bg-amazon-bg"></div>

            <div className="flex justify-between  mt-5 mb-5 ">
                <div>
                    <div className="mb-2 w-14 h-5 bg-amazon-bg rounded"></div>
                    <div className="mb-2 w-14 h-5 bg-amazon-bg rounded"></div>
                    <div className="mb-2 w-30 h-3 bg-amazon-bg rounded"></div>
                    <div className="mb-3 w-10 h-5 bg-amazon-bg rounded"></div>
                </div>
                <div>
                    <div className="mb-2 w-6 h-5 bg-amazon-bg rounded"></div>
                    <div className="mb-10 w-6 h-5 bg-amazon-bg rounded"></div>
                    <div className="mb-3 w-6 h-5 bg-amazon-bg rounded"></div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="w-20 h-10 bg-amazon-bg"></div>
                <div className="w-15 h-10 bg-amazon-bg"></div>
            </div>

            <div>
                <div className="bg-amazon-bg text-white w-full h-11
                        rounded-xl mt-5 mb-3"></div>
                        <div className="flex justify-center">
                            <div className="w-36 h-4 bg-amazon-bg text-center"></div>
                        </div>
            </div>
        </div>
    )

};
export default OrderSummarySkeleton