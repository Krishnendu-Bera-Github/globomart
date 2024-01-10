import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import useWishlist from "../hooks/useWishlist";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Get a single product usequery
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["productList", "p_id", productId],
    queryFn: () => getProduct(productId),
    staleTime: 1000 * 60 * 5,
  });

  const { isWishlisted, handleWishlist } = useWishlist(data || {});
  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
    navigate("/cart");
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading product: {error.message}</div>;
  }

  

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5  mx-auto flex flex-wrap overflow-hidden hover:ease-linear transition-transform duration-300">
          <img
            alt="ecommerce"
            className="lg:w-1/2 h-[500px] w-full object-fit rounded border border-gray-200 hover:scale-105 ease-linear transition-transform duration-300"
            src={data?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data?.title}
            </h1>

            <p className="leading-relaxed">{data?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <p>
                <span className="font-semibold"> Rating -</span>{" "}
                {`${data?.rating.rate} (${data?.rating.count})`}
              </p>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${data?.price}
              </span>
              <button
                onClick={() => handleAddToCart(data)}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Add to cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  onClick={() => handleWishlist(data)}
                  className={`w-5 h-5 ${isWishlisted ? "text-red-500" : ""}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
