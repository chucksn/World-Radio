import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setCardClicked } from "../redux/cardClickSlice";
import { setPlayerData } from "../redux/features/playerDataSlice";
import radioImg from "../assets/radio2.jpg";
import tailSpin from "../assets/tail-spin.svg";

function RadioStationCard({
  id,
  url,
  stationName,
  state,
  activeCountry,
  setActiveCountry,
  favicon,
  index,
  setClickedCardIndex,
  clickedCardIndex,
  playing,
  paused,
  waiting,
  pageNumber,
  setPageNumber,
  activePage,
  selectedCountry,
  favorites,
  setFavorites,
}) {
  const dispatch = useDispatch();
  const playerData = useSelector((state) => state.playerData);
  const cardClicked = useSelector((state) => state.cardClicked);

  const mainControlBtn = document.querySelector(".rhap_play-pause-button");

  const handleCardClick = () => {
    dispatch(setCardClicked());
    dispatch(
      setPlayerData({ url, stationName, state, favicon, id, selectedCountry })
    );
    setActiveCountry(selectedCountry);
    setClickedCardIndex(index);
    setPageNumber(activePage);
    playerData && mainControlBtn && mainControlBtn.click();
  };

  const icon = favicon ? favicon : radioImg;

  return (
    <div
      className={`radio-card flex items-center justify-between relative w-full min-h-24 xs-c:w-60 xs-c:min-h-48 xs-c:flex-col p-3 bg-zinc-900  rounded-lg hover:cursor-pointer lg:hover:shadow-c-3 ${
        clickedCardIndex === index &&
        pageNumber === activePage &&
        activeCountry === selectedCountry &&
        cardClicked
          ? "shadow-c-5"
          : "shadow-c-4"
      }`}
      onClick={handleCardClick}
    >
      <i
        className="fa-solid fa-heart absolute text-white/20 text-xl left-14 bottom-0 xs-c:top-2 xs-c:right-4 "
        title="Add to favorite"
      ></i>
      <img
        src={icon}
        alt="favicon"
        className="favicon w-10 h-10 xs-c:w-16 xs-c:h-16 rounded-full xs-c:mb-2 "
      />
      <div className=" card-info flex flex-col justify-center max-w-48 text-center">
        <span className="station-name block text-slate-200 font-unbounded text-xs">
          {stationName}
        </span>
        <span className="state-txt block text-lime-300 text-xs font-unbounded mt-1">
          {state}
        </span>
      </div>
      <div className="control-display relative w-12 h-12 xs-c:mt-2">
        <i
          className={`fa-solid fa-circle-play text-5xl text-white opacity-40 absolute left-0 ${
            clickedCardIndex === index &&
            pageNumber === activePage &&
            activeCountry === selectedCountry &&
            playing
              ? "hidden"
              : "block"
          }`}
        ></i>
        <i
          className={`fa-solid fa-circle-pause  text-5xl text-white opacity-40 absolute left-0 ${
            clickedCardIndex === index &&
            pageNumber === activePage &&
            activeCountry === selectedCountry &&
            playing
              ? "block"
              : "hidden"
          }`}
        ></i>
        {clickedCardIndex === index &&
          pageNumber === activePage &&
          activeCountry === selectedCountry &&
          !playing &&
          waiting && <img src={tailSpin} alt="spin" />}
      </div>
    </div>
  );
}

export default RadioStationCard;
