import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, getLoginUser } from "../services/api";
import {
  clearCart,
  clearWishlist,
  setCartLocally,
  setWishlistLocally,
} from "../redux/features/cartSlice";
import { logOutUser, userInfo } from "../redux/features/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { cart, wishlist } = useSelector((state) => state?.cart);

  const userDetails = useSelector((state) => state?.userDetails);

  const {
    isPending,
    isError,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["product", "categoryList"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

  const loginStorage = JSON.parse(localStorage.getItem("ecommerce-login"));

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["login", loginStorage],
    queryFn: async () => {
      const data = await getLoginUser(loginStorage);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  useEffect(() => {
    if (
      userDetails.user === undefined &&
      userDetails.isAuthenticated === true
    ) {
      dispatch(logOutUser());
    }
  }, [userDetails]);

  useEffect(() => {
    if (loginStorage === undefined || loginStorage === null) {
      localStorage.removeItem("ecommerce-login");
      dispatch(logOutUser());
    } else {
      refetch();
    }
  }, []);

  useEffect(() => {
    dispatch(userInfo(data?.user));
  }, [data]);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartStorage) {
      dispatch(setCartLocally(cartStorage));
    }
  }, []);

  useEffect(() => {
    const wishlistStorage = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlistStorage) {
      dispatch(setWishlistLocally(wishlistStorage));
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="flex flex-wrap place-items-center max-w-screen">
        <section className="relative mx-auto w-screen">
          <nav className="flex justify-between bg-gray-900 text-white w-full ">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link to="/" className="text-3xl font-bold font-heading">
                GloboMart
              </Link>

              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <Link to="/" className="hover:text-gray-200">
                    Home
                  </Link>
                </li>
                <li
                  className="relative group"
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <Link className="hover:text-gray-200 cursor-pointer">
                    Category
                  </Link>
                  {isMenuOpen && (
                    <ul className="absolute py-2 z-10 block bg-white text-gray-600 border border-gray-300 space-y-2 rounded-md">
                      {categories?.map((category, index) => (
                        <Link
                          key={category?.id || index}
                          to={`categories/${category}`}
                        >
                          <li className="px-4 py-2 hover:bg-gray-200">
                            {category?.toUpperCase()}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="/cart" className="hover:text-gray-200">
                    Cart
                  </Link>
                </li>
                {userDetails?.user?.length > 0 ? (
                  <li>
                    <Link to="/order" className="hover:text-gray-200">
                      Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>

              {/* Header Icons */}
              <div className="hidden xl:flex space-x-5 items-center">
                <Link to="/wishlist" className="hover:text-gray-200 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span
                    className={`flex absolute h-3 w-3 -mt-7 ml-4 ${
                      wishlist.length > 0 ? "animate-ping" : ""
                    }`}
                  >
                    <span className="bg-pink-500 px-[6px] rounded-full"></span>
                  </span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="bg-pink-500 px-[6px] rounded-full">
                      {cart?.length}
                    </span>
                  </span>
                </Link>
              </div>

              <ul className="px-2 md:flex font-semibold font-heading space-x-4">
                <li className="ml-5">
                  {userDetails?.user?.length > 0 ? (
                    <Link to="/" className="hover:text-gray-200">
                      <span
                        onClick={() => {
                          dispatch(logOutUser());
                          dispatch(clearCart());
                          dispatch(clearWishlist());
                          localStorage.removeItem("ecommerce-login");
                          localStorage.removeItem("wishlist");
                          localStorage.removeItem("cart");
                        }}
                      >
                        Logout
                      </span>
                    </Link>
                  ) : (
                    <Link to="/login" className="hover:text-gray-200">
                      Login
                    </Link>
                  )}
                </li>

                {!userDetails?.user?.length > 0 ? (
                  <li>
                    <Link to="/register" className="hover:text-gray-200">
                      Registration
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>

            {/* Responsive Navbar */}
            <Link className="xl:hidden flex mr-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </Link>
            <Link
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Link>
          </nav>
        </section>
      </div>
      <div
        className={`absolute w-full h-screen flex flex-col items-center justify-center text-4xl space-y-5 bg-gray-900 lg:hidden ${
          isMenuOpen ? "overflow-hidden" : ""
        }`}
      >
        <div className="">Home</div>
        <div>Category</div>
        <div>Collections</div>
        <div>Login/Signup</div>
      </div>
    </>
  );
};

export default Navbar;
