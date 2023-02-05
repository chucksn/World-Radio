import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const cardClickSlice = createSlice({
  name: "cardClick",
  initialState,
  reducers: {
    setCardClicked: (state) => (state = true),
    resetCardClicked: (state) => (state = initialState),
  },
});

export const { setCardClicked, resetCardClicked } = cardClickSlice.actions;
export default cardClickSlice.reducer;
