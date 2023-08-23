import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const addRemoveFavoriteSlice = createSlice({
  name: "add-remove-favorite",
  initialState,
  reducers: {
    setAddFavorite: () => {
      return "added";
    },
    setRemoveFavorite: () => {
      return "removed";
    },
    resetAddRemoveFavorite: (state) => {
      return (state = initialState);
    },
  },
});

export const { setAddFavorite, setRemoveFavorite, resetAddRemoveFavorite } =
  addRemoveFavoriteSlice.actions;

export default addRemoveFavoriteSlice.reducer;
