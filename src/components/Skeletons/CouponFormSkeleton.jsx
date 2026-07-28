import React from "react";

const CouponFormSkeleton = () =>{
    return (
            <div className=" rounded ">
                <h2 className="mb-3 flex gap-3 items-center w-36 h-6 bg-amazon-bg"></h2>
                <div className="flex gap-3 ">
                    <div className="flex-1 h-11 px-4 border border-amazon-border 
                            rounded-lg shadow-sm bg-amazon-bg"/>
                    <div className="w-28 shrink-0 h-11 rounded-lg bg-amazon-bg"></div>
                </div>
            </div>
    )

};

export default CouponFormSkeleton;