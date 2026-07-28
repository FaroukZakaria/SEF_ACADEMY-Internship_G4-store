import React from "react";
import { FiCheck } from "react-icons/fi";



const steps = [
    "confirmed",
    "processing",
    "shipped",
    "delivered",
];

const OrderProgress = ({ status }) => {
    const currentStep = steps.indexOf(status);

    return (
    <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6 mb-6">

        <div className="flex justify-between items-center">

            {steps.map((step, index) => (
                <React.Fragment key={step}>

                <div className="flex flex-col items-center">

                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                ${index <= currentStep ? "bg-amazon-orange text-white"
                    : "bg-amazon-bg text-amazon-surface"
                }`}>
                <FiCheck />
                </div>

                <span className={`mt-2 text-sm capitalize
                ${index <= currentStep ? "text-amazon-textDark font-semibold"
                    : "text-amazon-textLight"}`}> {step}
                </span>

            </div>

                {index !== steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded
                ${ index < currentStep ? "bg-amazon-orange": "bg-gray-200"
                }`}/>
            )}

            </React.Fragment>
        ))}

        </div>

    </div>
    );
};


export default OrderProgress;