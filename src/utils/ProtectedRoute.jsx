import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state?.userDetails);

  useEffect(() => {
    if (userState?.isAuthenticated && userState?.user?.length > 0) {
      navigate("/order");
    } else {
      navigate("/");
    }
  }, [userState]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
