import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    resetUser: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
