import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import countryReducer from "./features/other/countrySlice";
import playerDataReducer from "./features/player/playerDataSlice";
import countryCardClickReducer from "./features/other/countryCardClickSlice";
import favCardClickReducer from "./features/other/favCardClickSlice";
import favoritesReducer from "./features/favorite/favoritesSlice";
import loggedReducer from "./features/user/loggedSlice";
import signUpReducer from "./features/sign-in/showSignUpSlice";
import loginReducer from "./features/sign-in/showLoginSlice";
import userReducer from "./features/user/userSlice";
import userMenuToggleReducer from "./features/user/userMenuToggleSlice";
import playingReducer from "./features/player/playingSlice";
import waitingReducer from "./features/player/waitingSlice";
import pausedReducer from "./features/player/pausedSlice";
import activePageMainReducer from "./features/other/activePage-mainSlice";
import currentPageMainReducer from "./features/other/currentPage-mainSlice";
import verificationReducer from "./features/user/verificationSlice";
import verificationSentReducer from "./features/user/sendVerificationSlice";
import addRemoveFavoriteReducer from "./features/favorite/addRemoveFavoriteSlice";
import { stationsApi } from "./features/api/stationsApiSlice";
import { verifyApi } from "./features/api/verifyApiSlice";

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
    activePage_main: activePageMainReducer,
    currentPage_main: currentPageMainReducer,
    isVerified: verificationReducer,
    favoriteAddRemoveState: addRemoveFavoriteReducer,
    isVerificationSent: verificationSentReducer,
    [stationsApi.reducerPath]: stationsApi.reducer,
    [verifyApi.reducerPath]: verifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stationsApi.middleware, verifyApi.middleware),
});

setupListeners(store.dispatch);
