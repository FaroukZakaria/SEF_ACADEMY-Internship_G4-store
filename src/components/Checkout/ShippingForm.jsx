import React from "react";
import { FiMapPin } from "react-icons/fi"; 

const ShippingForm = ({ checkoutData, setCheckoutData , errors , setErrors }) => {

    const handleChange = (e) => {

        setCheckoutData((prev) => ({
            ...prev,

            shippingAddress: {
                ...prev.shippingAddress,

                [e.target.name]: e.target.value,
            },
        }));

        setErrors((prev) =>({
            ...prev,
            [e.target.name]:""
        }))
    };

    return(
        <div className="bg-amazon-surface border border-amazon-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <FiMapPin className="text-amazon-orange" size={22} />
                <h2 className="text-xl font-bold text-amazon-textDark"> Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>

                    <input type="text" name="fullName" 
                        value={checkoutData.shippingAddress.fullName}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg ${errors.fullName ? "border-red-500"
                                : "border-amazon-border focus:border-amazon-orange"}`}/>
                    { errors.fullName &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                        </p>
                    }            
                </div>

                <div>
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        Phone<span className="text-red-500">*</span>
                    </label>

                    <input type="tel" name="phone" 
                        value={checkoutData.shippingAddress.phone}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg ${errors.phone ? "border-red-500"
                                : "border-amazon-border focus:border-amazon-orange"}`}/>
                    { errors.phone &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </p>
                    }  
                </div>

                <div>
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        Country<span className="text-red-500">*</span>
                    </label>

                    <input type="text" name="country" 
                        value={checkoutData.shippingAddress.country}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg ${errors.country ? "border-red-500"
                                : "border-amazon-border focus:border-amazon-orange"}`}/>
                    { errors.country &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.country}
                        </p>
                    }  
                </div>

                <div>
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        City<span className="text-red-500">*</span>
                    </label>

                    <input type="text" name="city" 
                        value={checkoutData.shippingAddress.city}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg ${errors.city ? "border-red-500"
                                : "border-amazon-border focus:border-amazon-orange"}`}/>
                    { errors.city &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.city}
                        </p>
                    }  
                </div>



            </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        Address<span className="text-red-500">*</span>
                    </label>

                    <input type="text" name="address" 
                        value={checkoutData.shippingAddress.address}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg ${errors.address ? "border-red-500"
                                : "border-amazon-border focus:border-amazon-orange"}`}/>
                    { errors.address &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address}
                        </p>
                    }  
                </div>

                <div className="mt-4 md:w-1/2">
                    <div className="mt-4 ">
                    <label className="block text-sm font-medium text-amazon-textLight mb-2">
                        Postal Code
                    </label>

                    <input type="number" name="postalCode" 
                        value={checkoutData.shippingAddress.postalCode}
                        onChange={handleChange}
                        className="w-full h-11 px-4 border border-amazon-border
                                rounded-lg shadow-sm bg-amazon-surface outline-none
                                transition-all duration-200 focus:border-amazon-orange
                                focus:ring-4 focus:ring-amazon-orange/20
                                focus:shadow-lg"/>
                </div>

                </div>



        </div>

    )
};

    export default ShippingForm;