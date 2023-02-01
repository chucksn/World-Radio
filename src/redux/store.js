import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import stationReducer from "./features/stationSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    station: stationReducer,
  },
});
