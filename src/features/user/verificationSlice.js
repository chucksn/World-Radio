import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const verifiedSlice = createSlice({
  name: "isVerified",
  initialState,
  reducers: {
    setIsVerified: (state) => {
      return (state = true);
    },
    resetIsVerified: (state) => {
      return (state = initialState);
    },
  },
});

export const { setIsVerified, resetIsVerified } = verifiedSlice.actions;
export default verifiedSlice.reducer;
