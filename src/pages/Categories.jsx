import React from "react";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { getCategory } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { categorySortedItems } from "../redux/features/sortingSlice";
import { Pending } from "@mui/icons-material";
import Loader from "../components/Loader";

const Categories = () => {
  const { category } = useParams();
  const sortedProduct = useSelector(
    ({ sorting: { categorySort } }) => categorySort
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getCategory(category),
    staleTime: 1000 * 60 * 5,
    enabled: !!category,
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <ProductList
        data={data && data}
        sortedProduct={sortedProduct && sortedProduct}
        dispatchType={categorySortedItems}
      />
    </div>
  );
};

export default Categories;
