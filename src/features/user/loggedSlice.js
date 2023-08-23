import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isLoggedSlice = createSlice({
  name: "countryCardClick",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      return (state = true);
    },
    setLoggedOut: (state) => {
      return (state = initialState);
    },
  },
});

export const { setLoggedIn, setLoggedOut } = isLoggedSlice.actions;
export default isLoggedSlice.reducer;
