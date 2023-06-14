import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const currentPage_mainSlice = createSlice({
  name: "currentPage-main",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      return (state = action.payload);
    },
    resetCurrentPage: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCurrentPage, resetCurrentPage } =
  currentPage_mainSlice.actions;
export default currentPage_mainSlice.reducer;
