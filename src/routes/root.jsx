import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfileMenu from "../components/userProfileMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../features/user/loggedSlice";
import { setUser } from "../features/user/userSlice";
import { setIsVerified } from "../features/user/verificationSlice";
import useFavorites from "../hooks/useFavorites";
import { setPaused, resetPaused } from "../features/player/pausedSlice";
import { setPlaying, resetPlaying } from "../features/player/playingSlice";
import { setWaiting, resetWaiting } from "../features/player/waitingSlice";
import { resetActivePage } from "../features/other/activePage-mainSlice";
import { resetCurrentPage } from "../features/other/currentPage-mainSlice";
import Player from "../components/player";
import Toast from "../components/Toast";

function Root() {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);
  const playerData = useSelector((state) => state.playerData);
  const country = useSelector((state) => state.country);
  const { getFavorites } = useFavorites();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setLoggedIn());
      dispatch(setUser(user));
      dispatch(setIsVerified());
      getFavorites(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(resetActivePage());
    dispatch(resetCurrentPage());
    window.scrollTo(0, 0, "smooth");
  }, [country]);

  const handlePlay = () => {
    dispatch(setPlaying());
    dispatch(resetPaused());
    dispatch(resetWaiting());
  };

  const handlePause = () => {
    dispatch(resetPlaying());
    dispatch(setPaused());
    dispatch(resetWaiting());
  };

  const handleWaiting = () => {
    dispatch(setWaiting());
    dispatch(resetPaused());
    dispatch(resetPlaying());
  };

  return (
    <div className="shared-layout w-full h-full bg-gradient-to-r from-slate-600 to-gray-900 relative">
      <Header />
      <Outlet />
      <Footer />
      <Toast />
      <UserProfileMenu />
      {playerData && (
        <Player
          key="player"
          onPlay={handlePlay}
          onPause={handlePause}
          onWaiting={handleWaiting}
          playing={playing}
          paused={paused}
          waiting={waiting}
          icon={playerData.favicon}
          state={playerData.state}
          country={playerData.country}
          stationName={playerData.stationName.slice(0, 36)}
          url={playerData.url}
        />
      )}
    </div>
  );
}

export default Root;
