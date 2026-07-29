import React from "react";

const ShippingFormSkeleton = () => {
  return (
    <div className="bg-amazon-surface rounded-xl p-6 animate-pulse">

      {/* Title */}
      <div className="w-48 h-7 rounded bg-amazon-bg mb-6"></div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {[1,2,3,4].map((item)=>(
          <div key={item}>
            <div className="w-24 h-4 rounded bg-amazon-bg mb-2"></div>

            <div className="w-full h-11 rounded-lg bg-amazon-bg"></div>
          </div>
        ))}

      </div>

      {/* Address */}
      <div className="mt-5">
        <div className="w-24 h-4 rounded bg-amazon-bg mb-2"></div>

        <div className="w-full h-11 rounded-lg bg-amazon-bg"></div>
      </div>

      {/* Postal */}
      <div className="mt-5 w-full md:w-1/2">
        <div className="w-24 h-4 rounded bg-amazon-bg mb-2"></div>

        <div className="w-full h-11 rounded-lg bg-amazon-bg"></div>
      </div>

    </div>
  );
};

export default ShippingFormSkeleton;