import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const favCardClickSlice = createSlice({
  name: "favCardClick",
  initialState,
  reducers: {
    setFavCardClicked: (state) => {
      return (state = true);
    },
    resetFavCardClicked: (state) => {
      return (state = initialState);
    },
  },
});

export const { setFavCardClicked, resetFavCardClicked } =
  favCardClickSlice.actions;
export default favCardClickSlice.reducer;
