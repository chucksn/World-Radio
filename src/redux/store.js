import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import stationReducer from "./features/stationSlice";
import playerDataReducer from "./features/playerDataSlice";
import cardClickStatusReducer from "./cardClickSlice";
import countryCardClickSliceReducer from "./features/countryCardClickSlice";
import favCardClickSliceReducer from "./features/favCardClickSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    station: stationReducer,
    playerData: playerDataReducer,
    cardClicked: cardClickStatusReducer,
    countryCardClicked: countryCardClickSliceReducer,
    favCardClicked: favCardClickSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
