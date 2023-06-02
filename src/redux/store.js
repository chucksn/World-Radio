import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import playerDataReducer from "./features/playerDataSlice";
import countryCardClickReducer from "./features/countryCardClickSlice";
import favCardClickReducer from "./features/favCardClickSlice";
import favoritesReducer from "./features/favoritesSlice";
import loggedReducer from "./features/loggedSlice";
import signUpReducer from "./features/showSignUpSlice";
import loginReducer from "./features/showLoginSlice";
import userReducer from "./features/userSlice";
import userMenuToggleReducer from "./features/userMenuToggleSlice";
import playingReducer from "./features/playingSlice";
import waitingReducer from "./features/waitingSlice";
import pausedReducer from "./features/pausedSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    playerData: playerDataReducer,
    countryCardClicked: countryCardClickReducer,
    favCardClicked: favCardClickReducer,
    favorites: favoritesReducer,
    isLogged: loggedReducer,
    showLogin: loginReducer,
    showSignUp: signUpReducer,
    user: userReducer,
    userMenuToggle: userMenuToggleReducer,
    playing: playingReducer,
    paused: pausedReducer,
    waiting: waitingReducer,
  },
});
