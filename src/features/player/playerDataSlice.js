import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const playerDataSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerData: (state, action) => {
      return (state = action.payload);
    },
    resetPlayerData: (state) => {
      return (state = initialState);
    },
  },
});

export const { setPlayerData, resetPlayerData } = playerDataSlice.actions;

export default playerDataSlice.reducer;
