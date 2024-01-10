// sortingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeSort: [],
  categorySort: [],
  wishlistSort: [],
};
 
const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    homeSortedItems: (state, action) => {
      const { data, sortFilter } = action.payload;
      let sortedData = [...data];
      switch (sortFilter) {
        case "highToLow":
          sortedData.sort((a, b) => b.price - a.price);
          break;

        case "lowToHigh":
          sortedData.sort((a, b) => a.price - b.price);
          break;

        case "customerRating":
          sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
          break;

        case "popularity":
          sortedData;

        default:
          sortedData;
          break;
      }
      state.homeSort = sortedData;
    },
    categorySortedItems: (state, action) => {
      const { data, sortFilter } = action.payload;
      let sortedData = [...data];
      switch (sortFilter) {
        case "highToLow":
          sortedData.sort((a, b) => b.price - a.price);
          break;

        case "lowToHigh":
          sortedData.sort((a, b) => a.price - b.price);
          break;

        case "customerRating":
          sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
          break;

        case "popularity":
          sortedData;

        default:
          sortedData;
          break;
      }
      state.categorySort = sortedData;
    },
    wishlistSortedItems: (state, action) => {
      const { data, sortFilter } = action.payload;
      let sortedData = [...data];
      switch (sortFilter) {
        case "highToLow":
          sortedData.sort((a, b) => b.price - a.price);
          break;

        case "lowToHigh":
          sortedData.sort((a, b) => a.price - b.price);
          break;

        case "customerRating":
          sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
          break;

        case "popularity":
          sortedData;

        default:
          sortedData;
          break;
      }
      state.wishlistSort = sortedData;
    },
  },
});

export const { homeSortedItems, categorySortedItems, wishlistSortedItems } =
  sortingSlice.actions;
export default sortingSlice.reducer;
