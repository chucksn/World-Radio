import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const loginSlice = createSlice({
  name: "countryCardClick",
  initialState,
  reducers: {
    setShowLogin: (state) => {
      return (state = initialState);
    },
    resetShowLogin: (state) => {
      return (state = false);
    },
  },
});

export const { setShowLogin, resetShowLogin } = loginSlice.actions;
export default loginSlice.reducer;
