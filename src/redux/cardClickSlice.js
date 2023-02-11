import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const cardClickSlice = createSlice({
  name: "cardClick",
  initialState,
  reducers: {
    setCardClicked: (state) => {
      return (state = true);
    },
    resetCardClicked: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCardClicked, resetCardClicked } = cardClickSlice.actions;
export default cardClickSlice.reducer;
