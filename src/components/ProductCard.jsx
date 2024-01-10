import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useWishlist from "../hooks/useWishlist";

const ProductCard = ({ data }) => {
  const { isWishlisted, handleWishlist } = useWishlist(data);

  return (
    <div key={data?.id} className="group relative">
      <Link to={`/productdetails/${data?.id}`}>
        <div className="flex items-center justify-center mx-auto my-auto aspect-h-1 aspect-w-1 w-32 h-32 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
          <img
            src={data?.image}
            alt={data?.image}
            className="h-full w-full object-fit lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex flex-col justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-700 h-8">
              {data?.title.length > 60
                ? `${data?.title.substring(0, 40)}...`
                : data?.title}
            </h3>
          </div>

          <p className="text-sm font-medium text-gray-900">$ {data?.price}</p>
        </div>
      </Link>
      <div className="absolute top-0 right-0">
        <FavoriteIcon
          onClick={() => handleWishlist(data)}
          className={`${
            isWishlisted ? "text-red-500 " : "text-gray-400"
          } cursor-pointer `}
        />
      </div>
    </div>
  );
};

export default ProductCard;
