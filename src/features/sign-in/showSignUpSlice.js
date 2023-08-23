import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const signUpSlice = createSlice({
  name: "countryCardClick",
  initialState,
  reducers: {
    setShowSignUp: (state) => {
      return (state = true);
    },
    resetShowSignUp: (state) => {
      return (state = initialState);
    },
  },
});

export const { setShowSignUp, resetShowSignUp } = signUpSlice.actions;
export default signUpSlice.reducer;
