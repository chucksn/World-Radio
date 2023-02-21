import AudioPlayer from "react-h5-audio-player";
import { resetPlayerData } from "../redux/features/playerDataSlice";
import { resetCardClicked } from "../redux/cardClickSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { motion } from "framer-motion";

const playerVariant = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "linear" },
  },
};

function Player({
  url,
  stationName,
  state,
  country,
  icon,
  onPlay,
  onPause,
  playing,
  paused,
  waiting,
  onWaiting,
}) {
  const dispatch = useDispatch();
  const playerRef = useRef();

  const handleClosePlayer = () => {
    dispatch(resetPlayerData());
    dispatch(resetCardClicked());
    playerRef.current.style.display = "none";
  };

  const favicon = icon ? icon : "../src/assets/radio2.jpg";

  return (
    <motion.div
      ref={playerRef}
      className="player flex justify-between lg:justify-around items-center p-2 w-full min-h-20 fixed left-0  bottom-0 bg-black/90  z-10"
      variants={playerVariant}
      initial="hidden"
      animate="visible"
    >
      <img
        src={favicon}
        alt="favicon"
        className={`favicon w-10 h-10  rounded-full ${
          playing ? "animate-spin-slow" : "animate-none"
        }`}
      />
      {playing && (
        <img
          src="../src/assets/audio.svg"
          alt="playing"
          className="playing-svg"
        />
      )}
      {paused && !waiting && (
        <span className="text-xs sm:text-base block ml-1 text-yellow-300">
          Paused
        </span>
      )}
      {!playing && waiting && (
        <img
          src="../src/assets/tail-spin2.svg"
          alt="playing"
          className="playing-svg ml-1"
        />
      )}

      <AudioPlayer
        src={url}
        onPlay={onPlay}
        onPause={onPause}
        onPlayError={onWaiting}
        showJumpControls={false}
        showDownloadProgress={false}
        showFilledProgress={false}
        showSkipControls={false}
        autoPlay={true}
        autoPlayAfterSrcChange={true}
        customProgressBarSection={[]}
        customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
      />

      <div className="flex flex-col justify-center items-center m-3 text-center max-w-48 pr-2">
        <span className="station-name block text-slate-200 font-prosto md:font-unbounded text-xs ">
          {stationName}
        </span>
        <span className="state block text-lime-300 text-xs font-prosto md:font-unbounded mt-1">
          {state}
          {state && ","} {country}
        </span>
      </div>
      <i
        onClick={handleClosePlayer}
        className="close-btn fa-solid fa-circle-xmark text-white/60 font-semibold absolute top-0 right-4 text-xl md:text-2xl cursor-pointer"
      ></i>
    </motion.div>
  );
}

export default Player;
