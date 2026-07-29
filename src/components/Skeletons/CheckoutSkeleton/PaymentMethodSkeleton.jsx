import React from "react";

const PaymentMethodSkeleton = () => {
  return (
    <div className="bg-amazon-surface rounded-xl p-6 animate-pulse">

      {/* Title */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-6 h-6 rounded-full bg-amazon-bg"></div>

        <div className="w-40 h-6 rounded bg-amazon-bg"></div>

      </div>

      {/* Payment Card */}
      <div className="rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-amazon-bg"></div>

          <div>

            <div className="w-40 h-5 rounded bg-amazon-bg mb-3"></div>

            <div className="w-56 h-4 rounded bg-amazon-bg"></div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentMethodSkeleton;