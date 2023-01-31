import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      return (state = action.payload);
    },
    resetCountry: () => initialState,
  },
});

export const { setCountry, resetCountry } = countrySlice.actions;
export default countrySlice.reducer;
