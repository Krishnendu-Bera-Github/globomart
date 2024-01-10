import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import SortFilter from "./SortFilter";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const ProductList = ({ data, sortedProduct, dispatchType, text }) => {
  const dispatch = useDispatch();

  const handleSortFilter = (sortFilter) => {
    dispatch(dispatchType({ data, sortFilter }));
  };

  return (
    <div className="bg-white pb-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {text}
        </h2>

        <div className="mt-2 flex justify-between">
          <div>{""}</div>
          <div className="flex items-center">
            <h3 className="mr-2 font-semibold "> Filters :</h3>
            <SortFilter handleSortFilter={handleSortFilter} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortedProduct?.length > 0
            ? sortedProduct?.map((product) => (
                <div key={product?.id}>
                  <ProductCard data={product} />

                  <div className="flex justify-center pt-2">
                    <Link to="/cart">
                      <button
                        onClick={() => {
                          dispatch(addToCart(product));
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            : data?.map((item) => (
                <div key={item?.id}>
                  <ProductCard data={item} />

                  <div className="flex justify-center pt-2">
                    <Link to="/cart">
                      <button
                        onClick={() => {
                          dispatch(addToCart(item));
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
