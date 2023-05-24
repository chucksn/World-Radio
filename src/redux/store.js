import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import stationReducer from "./features/stationSlice";
import playerDataReducer from "./features/playerDataSlice";
import cardClickStatusReducer from "./cardClickSlice";
import countryCardClickSliceReducer from "./features/countryCardClickSlice";
import favCardClickSliceReducer from "./features/favCardClickSlice";
import favoritesSliceReducer from "./features/favoritesSlice";
import loggedSliceReducer from "./features/loggedSlice";
import signUpSliceReducer from "./features/showSignUpSlice";
import loginSliceReducer from "./features/showLoginSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    station: stationReducer,
    playerData: playerDataReducer,
    cardClicked: cardClickStatusReducer,
    countryCardClicked: countryCardClickSliceReducer,
    favCardClicked: favCardClickSliceReducer,
    favorites: favoritesSliceReducer,
    isLogged: loggedSliceReducer,
    showLogin: loginSliceReducer,
    showSignUp: signUpSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
