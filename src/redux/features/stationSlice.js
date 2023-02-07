import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    setStation: (state, action) => {
      return (state = action.payload);
    },
    resetStation: (state) => (state = initialState),
  },
});

export const { setStation, resetStation } = stationSlice.actions;
export default stationSlice.reducer;
