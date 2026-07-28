import React from "react";
import { FiTrash2 , FiMinus , FiPlus } from "react-icons/fi";


const CartItem = ({item , increaseQuantity , decreaseQuantity , deleteItem , isLast }) => {
    return (
        <div className="border-amazon-border">
            <div className={`w-full py-6 px-4 flex justify-between items-center gap-2 
            ${!isLast ? "border-b border-amazon-border" : "" }`}>
                <div className="flex gap-4 items-center">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"/>

                <div>
                    <h3 className="text-md font-semibold text-amazon-textDark ">
                        {item.name}</h3>
                    <p className="text-sm font-semibold text-amazon-orange  
                        mt-2 mb-4">EGP {item.price}</p>
                    <div className="flex gap-4 mt-2">
                        <div className="border border-amazon-border 
                            rounded w-7 h-7 flex items-center 
                            justify-center cursor-pointer" 
                            onClick={() => decreaseQuantity(item.product, item.quantity)}>
                            <FiMinus size={14} />
                        </div>

                        <div className="text-amazon-navy">{item.quantity}</div>

                        <div className="border border-amazon-border
                            rounded w-7 h-7 flex items-center 
                            justify-center cursor-pointer" 
                            onClick={() => increaseQuantity(item.product, item.quantity)}>
                            <FiPlus size={14} />
                        </div>

                    </div>

                </div>
                </div>
                

                <div className="flex flex-col items-end">
                    <button className="mb-8 hover:text-destructive cursor-pointer"
                        onClick={() => deleteItem(item.product)}>
                        <FiTrash2 size={18}/>
                    </button>

                    <p className="text-md font-bold text-amazon-textDark">
                        EGP {item.price * item.quantity}</p>
                </div>

            </div>
        </div>
    )

};
export default CartItem;