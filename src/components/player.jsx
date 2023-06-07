import AudioPlayer from "react-h5-audio-player";
import { resetPlayerData } from "../redux/features/playerDataSlice";
import { resetFavCardClicked } from "../redux/features/favCardClickSlice";
import { resetCountryCardClicked } from "../redux/features/countryCardClickSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { motion } from "framer-motion";
import radioImg from "../assets/radio2.jpg";
import audioVisualizer from "../assets/audio.svg";
import tailSpin from "../assets/tail-spin2.svg";

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
    dispatch(resetCountryCardClicked());
    dispatch(resetFavCardClicked());

    playerRef.current.style.display = "none";
  };

  const favicon = icon ? icon : radioImg;

  return (
    <motion.div
      ref={playerRef}
      className="player-ctn flex justify-center w-full min-h-20 fixed left-0 bottom-0 z-10"
      variants={playerVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="player w-[95%] flex justify-between  items-center pt-6 md:pt-2 pb-2 px-4 md:px-8 lg:px-16 rounded-t-lg bg-black/90 shadow-c-gold relative">
        <img
          src={favicon}
          alt="favicon"
          className={`favicon w-10 h-10  rounded-full ${
            playing ? "animate-spin-slow" : "animate-none"
          }`}
        />
        {playing && (
          <img src={audioVisualizer} alt="playing" className="playing-svg" />
        )}
        {paused && !waiting && (
          <span className="text-xs sm:text-base block mx-1 text-yellow-300">
            Paused
          </span>
        )}
        {!playing && waiting && (
          <img src={tailSpin} alt="playing" className="playing-svg mx-1" />
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
          customControlsSection={["MAIN_CONTROLS"]}
        />

        <div className="name-location-details flex flex-col justify-center items-center text-center max-w-40 ">
          <span className="station-name block text-slate-200 font-prosto md:font-unbounded text-[11px] sm:text-xs ">
            {stationName}
          </span>
          <span className="state block text-sky-500 text-[11px] sm:text-xs font-prosto md:font-unbounded mt-1">
            {state}
            {state && ","} {country}
          </span>
        </div>
        <i
          onClick={handleClosePlayer}
          className="close-btn fa-solid fa-circle-xmark text-white/60 font-semibold absolute top-0 right-4 text-xl md:text-2xl cursor-pointer"
        ></i>
      </div>
    </motion.div>
  );
}

export default Player;
