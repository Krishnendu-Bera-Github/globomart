import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="mt-20 flex justify-center items-center mb-[70vh]">
      <Bars
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
