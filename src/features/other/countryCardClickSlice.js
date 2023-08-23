import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const countryCardClickSlice = createSlice({
  name: "countryCardClick",
  initialState,
  reducers: {
    setCountryCardClicked: (state) => {
      return (state = true);
    },
    resetCountryCardClicked: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCountryCardClicked, resetCountryCardClicked } =
  countryCardClickSlice.actions;
export default countryCardClickSlice.reducer;
