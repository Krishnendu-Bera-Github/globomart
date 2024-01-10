import React, { useEffect } from "react";

import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../services/api";
import { homeSortedItems } from "../redux/features/sortingSlice";
import Loader from "../components/Loader";
import { userInfo } from "../redux/features/userSlice";
import Carousel from "../components/Carousel";

const Home = () => {
  const sortedProduct = useSelector(({ sorting: { homeSort } }) => homeSort);
  const wishlistState = useSelector(({ cart: { wishlist } }) => wishlist);
  const userState = useSelector((state) => state?.userDetails);

  const dispatch = useDispatch();

  // Product List usequery
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["productList", "home"],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (wishlistState.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistState));
    }
  }, [wishlistState]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden">
      <div>
        <Carousel />
      </div>
      <ProductList
        data={data && data}
        sortedProduct={sortedProduct && sortedProduct}
        dispatchType={homeSortedItems}
        text="Customers also purchased"
      />
    </div>
  );
};

export default Home;
