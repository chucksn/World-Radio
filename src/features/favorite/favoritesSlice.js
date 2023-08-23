import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      return (state = action.payload);
    },
    resetFavorites: (state) => {
      return (state = initialState);
    },
  },
});

export const { setFavorites, resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
