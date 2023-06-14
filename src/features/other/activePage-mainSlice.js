import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const activePage_mainSlice = createSlice({
  name: "activePage-main",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      return (state = action.payload);
    },
    resetActivePage: (state) => {
      return (state = initialState);
    },
  },
});

export const { setActivePage, resetActivePage } = activePage_mainSlice.actions;
export default activePage_mainSlice.reducer;
