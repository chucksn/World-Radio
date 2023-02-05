import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import stationReducer from "./features/stationSlice";
import playerDataReducer from "./features/playerDataSlice";
import cardClickStatusReducer from "./cardClickSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    station: stationReducer,
    playerData: playerDataReducer,
    cardClicked: cardClickStatusReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
