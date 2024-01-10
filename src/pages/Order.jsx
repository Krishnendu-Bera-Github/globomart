import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoItemsMessage from "../components/NoItemsMessage";

const Order = () => {
  const userDetails = useSelector((state) => state?.userDetails);

  return (
    <div className="w-[80vw] mx-auto mb-80">
      {userDetails?.isAuthenticated &&
      userDetails?.user[0]?.orderedProducts?.length > 0 ? (
        userDetails.user[0].orderedProducts.map((item) => (
          <div className="w-[80vw] bg-gray-100 mx-auto my-5 p-3 flex justify-between items-center rounded-md px-5">
            <div className="w-[80px]">
              <Link to={`/productdetails/${item?.id}`} key={item?.id}>
                <img className="rounded-md h-[50px]" src={item.image} alt="" />
              </Link>
            </div>
            <div className="w-80">
              <p>
                {item?.title.length > 38
                  ? `${item?.title.substr(0, 38)}...`
                  : item?.title}
              </p>
            </div>
            <div className="w-[80px]">
              <p>{item?.qty}</p>
            </div>
            <div className="w-[80px]">
              <p>{item?.price}</p>
            </div>
            <div className="w-[80px]">
              <p>$ {item?.qty * item?.price}</p>
            </div>
            <div>
              <p className="flex items-center">
                <span className="w-[10px] h-[10px] bg-green-500 block rounded-full mr-2"></span>
                Ordered on {item?.date}
              </p>
              <p className="text-sm">
                Your item will be delivered in a few days
              </p>
            </div>
          </div>
        ))
      ) : (
        <NoItemsMessage text={"There are no items in your order list"} />
      )}
    </div>
  );
};

export default Order;
