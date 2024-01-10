import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userInfo, logOutUser } = userSlice.actions;
export default userSlice.reducer;
