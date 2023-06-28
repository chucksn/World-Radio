import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isVerificationSentSlice = createSlice({
  name: "isVerificationSent",
  initialState,
  reducers: {
    setVerificationSent: (state) => {
      return (state = true);
    },
    resetVerificationSent: (state) => {
      return (state = initialState);
    },
  },
});

export const { setVerificationSent, resetVerificationSent } =
  isVerificationSentSlice.actions;
export default isVerificationSentSlice.reducer;
