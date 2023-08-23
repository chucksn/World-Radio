import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const playingSlice = createSlice({
  name: "playing",
  initialState,
  reducers: {
    setPlaying: (state) => {
      return (state = true);
    },
    resetPlaying: (state) => {
      return (state = initialState);
    },
  },
});

export const { setPlaying, resetPlaying } = playingSlice.actions;
export default playingSlice.reducer;
