import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfileMenu from "../components/userProfileMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/features/loggedSlice";
import { setUser } from "../redux/features/userSlice";
import useFavorites from "../hooks/useFavorites";
import { setPaused, resetPaused } from "../redux/features/pausedSlice";
import { setPlaying, resetPlaying } from "../redux/features/playingSlice";
import { setWaiting, resetWaiting } from "../redux/features/waitingSlice";
import Player from "../components/player";

function Root() {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);
  const playerData = useSelector((state) => state.playerData);
  const { getFavorites } = useFavorites();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setLoggedIn());
      dispatch(setUser(user));
      getFavorites(user.token);
    }
  }, []);

  const handlePlay = () => {
    dispatch(setPlaying());
    dispatch(resetPaused());
    dispatch(resetWaiting());
  };

  const handlePause = () => {
    dispatch(resetPlaying());
    dispatch(setPaused());
  };

  const handleWaiting = () => {
    dispatch(setWaiting());
    dispatch(resetPaused());
  };

  return (
    <div className="shared-layout w-full min-h-screen bg-gradient-to-r from-slate-600 to-gray-900 pt-11 pb-72 relative">
      <Header />
      <Outlet />
      <Footer />
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
