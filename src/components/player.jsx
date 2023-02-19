import AudioPlayer from "react-h5-audio-player";
import { resetPlayerData } from "../redux/features/playerDataSlice";
import { resetCardClicked } from "../redux/cardClickSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";

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
    <div
      ref={playerRef}
      className="player flex justify-between lg:justify-around items-center p-2 w-full min-h-20 fixed left-0  bottom-0 bg-black/90  z-10"
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
      {paused && (
        <span className="text-xs sm:text-base block ml-1 text-yellow-300">
          Paused
        </span>
      )}

      <AudioPlayer
        src={url}
        onPlay={onPlay}
        onPause={onPause}
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
      <span
        onClick={handleClosePlayer}
        className="close-btn text-white font-semibold absolute top-0 right-3 text-lg md:text-2xl cursor-pointer"
      >
        &times;
      </span>
    </div>
  );
}

export default Player;
