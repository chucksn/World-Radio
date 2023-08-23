import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const pausedSlice = createSlice({
  name: "paused",
  initialState,
  reducers: {
    setPaused: (state) => {
      return (state = true);
    },
    resetPaused: (state) => {
      return (state = initialState);
    },
  },
});

export const { setPaused, resetPaused } = pausedSlice.actions;
export default pausedSlice.reducer;
