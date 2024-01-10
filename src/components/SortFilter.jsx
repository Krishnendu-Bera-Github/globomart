import React, { useState } from "react";

const SortFilter = ({ handleSortFilter }) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleMouseEnter = () => {
    setIsDropDown(true);
  };

  const handleMouseLeave = () => {
    setIsDropDown(false);
  };

  const handleSort = (item, e) => {
    e.preventDefault();
    handleSortFilter(item);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="text-black bg-gray-100 hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Sort
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${isDropDown ? "block" : "hidden"}
          absolute bg-white w-[200px] py-2 text-sm text-gray-700 dark:text-gray-200`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul aria-labelledby="dropdownDefaultButton">
          <li>
            <a
              onClick={(e) => handleSort("popularity", e)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Popularity
            </a>
          </li>
          <li>
            <a
              onClick={(e) => handleSort("highToLow", e)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Price: High to Low
            </a>
          </li>
          <li>
            <a
              onClick={(e) => handleSort("lowToHigh", e)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Price: Low to High
            </a>
          </li>
          <li>
            <a
              onClick={(e) => handleSort("customerRating", e)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Customer Ratings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortFilter;
