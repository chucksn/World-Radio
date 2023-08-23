import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const userMenuToggleSlice = createSlice({
  name: "user-menu-toggle",
  initialState,
  reducers: {
    setUserMenuToggle: (state) => {
      return !state;
    },
    resetUserMenuToggle: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUserMenuToggle, resetUserMenuToggle } =
  userMenuToggleSlice.actions;
export default userMenuToggleSlice.reducer;
