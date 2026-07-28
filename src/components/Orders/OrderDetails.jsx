import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiPackage , FiMapPin , FiCreditCard , FiXCircle} from "react-icons/fi";
import OrderProgress from "./OrderProgress";
import OrderDetailsSkeleton from "../Skeletons/SkeletonOrders/OrderDetailsSkeleton";

const OrderDetails = () =>{
    const { id } = useParams();

    const [order , setOrder] = useState(null);

    const [loading , setLoading] = useState(true);

    const [cancelLoading, setCancelLoading] = useState(false);

    const token = localStorage.getItem("token");

    const getOrderDetails = async () =>{
        try{
            setLoading(true);

            const response = await axios.get(
                `https://e-commerce-api-3wara.vercel.app/orders/my/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            );

            setOrder(response.data.order);

        }catch(error){
            toast.error("Failed to load order details")

        }finally{
            setLoading(false)
        }
    }

    const cancelOrder = async () =>{
        try{
            setCancelLoading(true);
            await axios.patch(
                `https://e-commerce-api-3wara.vercel.app/orders/my/${id}/cancel`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Order cancelled successfully");
            await getOrderDetails();

        }catch(error){
            toast.error("Unable to cancel this order");

        }finally{
            setCancelLoading(false);
        }
    }

    useEffect(() =>{

        getOrderDetails();

    },[id])

    if(loading){
        return <OrderDetailsSkeleton />
    }
    if (!order) {
    return null;
    }


    const statusClasses = {
        pending: "bg-yellow-100 text-yellow-600",
        confirmed: "bg-green-100 text-green-600",
        processing: "bg-blue-100 text-blue-600",
        shipped: "bg-purple-100 text-purple-600",
        delivered: "bg-emerald-100 text-emerald-600",
        cancelled: "bg-red-100 text-red-600",
        returned: "bg-violet-200 text-violet-600",
    };
    const statusClass = statusClasses[order.status] || "bg-gray-100 text-gray-600";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">

                            {/* Header */}
            <div className="flex justify-between items-start mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-amazon-textDark">
                        Order Details
                    </h1>

                    <p className="text-amazon-textLight mt-2">
                        Order #{order._id.slice(0,8)}
                    </p>
                </div>
                <span className={`rounded-full px-4 py-2 ${statusClass}`}>
                    {order.status}
                </span>

        </div>

                    {/* Order Progress */}
                {order.status !== "cancelled" && (
                    <OrderProgress status={order.status} />
                )}

                    {/* Items */}

        <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6 mb-6">

            <div className="flex items-center gap-2 mb-6">
                <FiPackage className="text-amazon-orange" size={22} />
                <h2 className="text-xl font-bold">Items</h2>
            </div>

        <div className="space-y-5">
            {order.items.map((item) => (
        <div
            key={item.product}
            className="flex justify-between items-center">

            <div className="flex items-center gap-4">

                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"/>

                <div>
                    <h3 className="font-semibold text-amazon-textDark">
                        {item.name}
                    </h3>

                    <p className="text-sm text-amazon-textLight">
                        Qty: {item.quantity} × EGP {item.price}
                    </p>
                </div>

            </div>

            <span className="font-bold text-amazon-textDark">
                EGP {item.price * item.quantity}
            </span>
        </div>
        ))}
    </div>

        </div>

            {/* Bottom */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6">

                <div className="flex items-center gap-2 mb-6">
                    <FiMapPin size={22} className="text-amazon-orange"/>
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>

            <div className="space-y-2 text-amazon-textLight">

                <p className="font-semibold text-md">
                    {order.shippingAddress.fullName}
                </p>

                <p className="font-semibold text-sm">
                    {order.shippingAddress.address}
                </p>

                <p className="font-semibold text-sm">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                </p>

                <p className="font-semibold text-sm">
                    {order.shippingAddress.phone}
                </p>

            </div>

        </div>


            <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6">

                <div className="flex items-center gap-2 mb-6">
                    <FiCreditCard size={22} className="text-amazon-orange"/>

                    <h2 className="text-xl font-bold">Payment</h2>
                </div>

                <div>

                    <div>

                        <p className="font-semibold capitalize mb-3 text-amazon-textLight">
                            {order.paymentMethod}
                        </p>
                    </div>
                <hr className="border-amazon-border" /> 
                <div className="flex items-center justify-between">
                    <p className="text-amazon-textDark font-bold text-sm">Total</p>

                    <p className="text-md mt-2 font-bold text-amazon-orange">
                        EGP {order.totalPrice}
                    </p>
                </div>

                <div className="flex items-center font-medium text-amazon-textLight text-sm">
                    <p>Placed on </p>

                    <p className="mx-1">
                        {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </p>
                </div>

            </div>


        </div>


    </div>
                                    {/* Cancel Button */}
                {(order.status === "pending" || order.status === "confirmed") && (
                        <div className="mt-8 flex justify-center">
                            <button onClick={cancelOrder} disabled={cancelLoading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl
                                    text-white transition 
                                    ${cancelLoading? "bg-red-400 cursor-not-allowed"
                                    : "bg-destructive hover:bg-red-700 cursor-pointer"}`}>
                                    <FiXCircle size={18} strokeWidth={3} /> 
                                    {cancelLoading ? "Cancelling..." : "Cancel Order"}
                            </button>
                        </div>
                )}
    </div>
);

};
export default OrderDetails;