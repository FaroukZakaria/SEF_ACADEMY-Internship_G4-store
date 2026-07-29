import React from "react";
import { FiChevronRight  } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) =>{


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

    const formattedDate = new Date(order.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    )

    return(
        <div>
            <Link to={`/orders/${order._id}`}>
                <div className="bg-amazon-surface w-full max-w-5xl
                        mx-auto h-30 m-auto flex p-7 justify-between items-center
                    rounded-2xl border border-amazon-border mb-5 hover:shadow-lg">
                    <div>
                        <span className="text-amazon-textDark">
                            #{order._id.slice(0,8)}
                        </span>

                        <span className={`rounded-full px-3 py-1 
                            text-sm font-medium mx-4 ${statusClass}`}>
                            {order.status} </span>

                        <p className="text-amazon-textLight">
                            {formattedDate}
                        </p>
                        <p className="text-amazon-textLight text-sm font-semibold">
                            {order.items.length} Item(s)</p>

                    </div>

                    <div className="flex items-center gap-5">
                        <span className="text-xl font-bold text-amazon-orange ">
                            EGP {order.totalPrice}</span>
                        <span className="text-amazon-textLight text-sm font-semibold">
                            <FiChevronRight  size={25} />
                        </span>

                    </div>
                </div>
            </Link>

        </div>
    )
};

export default OrderCard;