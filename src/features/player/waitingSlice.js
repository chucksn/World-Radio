import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const waitingSlice = createSlice({
  name: "waiting",
  initialState,
  reducers: {
    setWaiting: (state) => {
      return (state = true);
    },
    resetWaiting: (state) => {
      return (state = initialState);
    },
  },
});

export const { setWaiting, resetWaiting } = waitingSlice.actions;
export default waitingSlice.reducer;
