import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "US", label: "United States" };

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      return (state = action.payload);
    },
    resetCountry: (state) => (state = initialState),
  },
});

export const { setCountry, resetCountry } = countrySlice.actions;
export default countrySlice.reducer;
