import React from "react";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { wishlistSortedItems } from "../redux/features/sortingSlice";
import NoItemsMessage from "../components/NoItemsMessage";

const Wishlist = () => {
  const wishlistState = useSelector(({ cart: { wishlist } }) => wishlist);
  const sortedtProduct = useSelector(
    ({ sorting: { wishlistSort } }) => wishlistSort
  );

  return (
    <div>
      {wishlistState.length > 0 ? (
        <ProductList
          data={wishlistState && wishlistState}
          sortedProduct={sortedtProduct && sortedtProduct}
          dispatchType={wishlistSortedItems}
          text="Wishlist"
        />
      ) : (
        <NoItemsMessage text="There is no items in the wishlist" />
      )}
    </div>
  );
};

export default Wishlist;
