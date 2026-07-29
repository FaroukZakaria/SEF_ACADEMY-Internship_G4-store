import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import EmptyOrders from "./EmptyOrders";
import MyOrdersSkeleton from "../Skeletons/SkeletonOrders/MyOrdersSkeleton";
import { toast } from "react-toastify";

const MyOrders = () =>{
    
    const [orders , setOrders] = useState([]);

    const [page , setPage] =useState(1);

    const [totalPages , setTotalPages] = useState(1);

    const [loadingMore, setLoadingMore] = useState(false);

    const [loading , setLoading] = useState(true)

    const token = localStorage.getItem("token");

    const getOrders = async () =>{
        try{
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const response = await axios.get(
                `https://e-commerce-api-3wara.vercel.app/orders/my?page=${page}&limit=5`,
                {
                headers: {
                Authorization: `Bearer ${token}`,
                    }, });

                setTotalPages(response.data.totalPages);

                if (page === 1) {
                    setOrders(response.data.orders);
                } else {
                    setOrders((prevOrders) => [
                        ...prevOrders,
                        ...response.data.orders,
                ]); }


        }catch(error){
            toast.error("Failed to load orders. Please try again.")
        }finally{
            if (page === 1) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    }

    useEffect(() =>{
        getOrders();
    },[page])

    if(loading){
        return <MyOrdersSkeleton />
    }

    if (!loading && orders.length === 0) {
    return <EmptyOrders /> ;
    }

    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold 
                text-amazon-textDark mt-5 ">My Orders</h1>

            <div>
                {orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order} />
                ))}
                {(page < totalPages || loadingMore) && (
                    <div className="flex justify-center mt-8">

                        <button
                            disabled={loadingMore}
                            onClick={() => setPage((prev) => prev + 1)}
                                className="bg-amazon-orange hover:bg-amazon-orangeHover
                                text-white px-6 py-3 rounded-xl
                                transition-all duration-200">
                            {loadingMore ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}

            </div>
                
            


        </div>

    )
};
export default MyOrders;