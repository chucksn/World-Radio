import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setCardClicked } from "../redux/cardClickSlice";
import { setPlayerData } from "../redux/features/playerDataSlice";

function RadioStationCard({
  id,
  url,
  stationName,
  state,
  favicon,
  index,
  setClickedCardIndex,
  clickedCardIndex,
  playing,
}) {
  const dispatch = useDispatch();
  const playerData = useSelector((state) => state.playerData);

  const mainControlBtn = document.querySelector(".rhap_play-pause-button");

  const handleCardClick = () => {
    dispatch(setCardClicked());
    dispatch(setPlayerData({ url, stationName, state, favicon, id }));
    setClickedCardIndex(index);
    playerData && mainControlBtn.click();
  };

  const icon = favicon ? favicon : "../src/assets/radio2.jpg";

  return (
    <div
      className={`radio-card flex items-center justify-between w-full h-24 xs-c:w-60 xs-c:h-48 xs-c:flex-col text-center p-3 bg-zinc-900  rounded-lg hover:cursor-pointer lg:hover:shadow-c-3 ${
        clickedCardIndex === index ? "shadow-c-5" : "shadow-c-4"
      }`}
      onClick={handleCardClick}
    >
      <img
        src={icon}
        alt="favicon"
        className="favicon w-10 h-10 xs-c:w-16 xs-c:h-16 rounded-full xs-c:mb-2 "
      />
      <div className="flex flex-col justify-center ">
        <span className="station-name block text-slate-200 font-unbounded text-xs">
          {stationName}
        </span>
        <span className="state block text-lime-300 text-xs font-unbounded mt-1">
          {state}
        </span>
      </div>
      <div className="control-display relative w-12 h-12">
        <i
          className={`fa-solid fa-circle-play text-5xl text-white opacity-40 absolute left-0 ${
            clickedCardIndex === index && playing ? "hidden" : "block"
          }`}
        ></i>
        <i
          className={`fa-solid fa-circle-pause  text-5xl text-white opacity-40 absolute left-0 ${
            clickedCardIndex === index && playing ? "block" : "hidden"
          }`}
        ></i>
      </div>
    </div>
  );
}

export default RadioStationCard;
