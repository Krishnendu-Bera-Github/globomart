import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increment,
  decrement,
  removeFromCart,
} from "../redux/features/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const handleCartStorage = (id) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartStorage.filter((item) => item?.id !== id))
    );
  };
  
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <Link to={`/productdetails/${item?.id}`}>
        <img
          src={item?.image}
          className="w-full h-[100px]  rounded-lg sm:w-40 cursor-pointer"
        />
      </Link>
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <Link to={`/productdetails/${item?.id}`}>
            <h2 className="text-sm font-semibold text-gray-900 hover:text-blue-500 cursor-pointer">
              {item?.title}
            </h2>
          </Link>
          <h2 className="text-sm font-semibold text-gray-900 pt-2">
            $ {item?.price}
          </h2>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className=" flex items-center border-gray-100">
            <span
              onClick={() => dispatch(decrement(item?.id))}
              className=" cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <span className="px-2">{item?.qty}</span>
            <span
              onClick={() => {
                dispatch(increment(item?.id));
                
              }}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="w-[105px] flex items-center space-x-4">
            <p className="w-full text-sm font-semibold">
              $ {`${(item?.qty * item?.price).toFixed(2)}`}
            </p>
            <DeleteIcon
              onClick={() => {
                dispatch(removeFromCart(item?.id));
                handleCartStorage(item.id);
                toast.error("Product removed from cart", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }}
              className="text-red-600 cursor-pointer hover:text-red-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
