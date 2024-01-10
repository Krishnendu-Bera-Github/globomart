import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userInfo } from "../redux/features/userSlice";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/api";
import { clearCart } from "../redux/features/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const cart = useSelector(({ cart: { cart } }) => cart);

  const user = useSelector(({ userDetails: { user } }) => user);
  const userDetails = useSelector((state) => state?.userDetails);

  const dispatch = useDispatch();

  let initalValue = 0;

  const totalPrice = cart.reduce((a, b) => a + b.qty * b.price, initalValue);

  const handlePlaceOrder = () => {
    if (cart?.length > 0 && userDetails?.isAuthenticated) {
      const updateCartWithDate = cart?.map((item) => ({
        ...item,
        date: new Date().toLocaleDateString("en-GB"),
      }));

      const updateUserInfo = user?.map((item) => ({
        ...item,
        orderedProducts: [...item.orderedProducts, ...updateCartWithDate],
      }));

      dispatch(userInfo(updateUserInfo));
      mutation.mutate(...updateUserInfo);
      dispatch(clearCart([]));
      localStorage.removeItem("cart");
      toast.success("Thank you for ordering from Globomart");
    } else {
      toast.warn("You are not logged in... Please login to purchase items");
    }
  };

  const mutation = useMutation({
    mutationFn: updateUser,
  });

  if (mutation.isPending) {
    return <Loader />;
  }

  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">${totalPrice.toFixed(2)} USD</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <Link to={`${userDetails?.isAuthenticated ? `/order` : ``}`}>
        <button
          onClick={handlePlaceOrder}
          className={`mt-6 w-full rounded-md ${
            userDetails?.isAuthenticated
              ? `bg-blue-500 hover:bg-blue-600`
              : `bg-gray-400`
          } py-1.5 font-medium text-blue-50 `}
        >
          Place Order
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
