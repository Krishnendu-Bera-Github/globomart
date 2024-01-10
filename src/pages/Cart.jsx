import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import Checkout from "../components/Checkout";
import NoItemsMessage from "../components/NoItemsMessage";
import { clearCart } from "../redux/features/cartSlice";

const Cart = () => {
  const cart = useSelector(({ cart: { cart } }) => cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  if (!cart.length) {
    return <NoItemsMessage text="There is no items in the cart" />;
  }

  return (
    <div className=" bg-gray-100 pt-4 pb-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart &&
            cart.map((product) => (
              <CartItems key={product?.id} item={product && product} />
            ))}
        </div>
        {cart.length > 0 && <Checkout />}
      </div>
      <div className="ml-44">
        <button
          className="px-10 py-2 bg-red-700 text-white rounded-md hover:bg-red-900"
          onClick={() => dispatch(clearCart())}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Cart;
