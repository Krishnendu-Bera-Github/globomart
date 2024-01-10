import React from "react";
import { Link } from "react-router-dom";

const NoItemsMessage = ({ text }) => {
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">{text}</h3>
      <Link to="/">
        <div className="px-6 py-4 bg-blue-600 text-white rounded-md mt-4 cursor-pointer hover:bg-blue-500">
          GO TO HOMEPAGE
        </div>
      </Link>
    </div>
  );
};

export default NoItemsMessage;
