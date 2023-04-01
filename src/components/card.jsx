import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setCardClicked } from "../redux/cardClickSlice";
import { setPlayerData } from "../redux/features/playerDataSlice";
import {
  setFavCardClicked,
  resetFavCardClicked,
} from "../redux/features/favCardClickSlice";
import {
  setCountryCardClicked,
  resetCountryCardClicked,
} from "../redux/features/countryCardClickSlice";
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
  cardCtnItems,
  setClickedFavCardIndex,
  clickedFavCardIndex,
  favoriteIndex,
}) {
  const dispatch = useDispatch();
  const playerData = useSelector((state) => state.playerData);
  const cardClicked = useSelector((state) => state.cardClicked);
  const favCardClicked = useSelector((state) => state.favCardClicked);
  const countryCardClicked = useSelector((state) => state.countryCardClicked);

  const mainControlBtn = document.querySelector(".rhap_play-pause-button");

  const handleCardClick = () => {
    dispatch(setCardClicked());
    dispatch(
      setPlayerData({ url, stationName, state, favicon, id, selectedCountry })
    );
    cardCtnItems === "country" && setActiveCountry(selectedCountry);
    cardCtnItems === "country" && setClickedCardIndex(index);
    cardCtnItems === "country" && setPageNumber(activePage);
    cardCtnItems != "country" && setClickedFavCardIndex(favoriteIndex);
    cardClicked &&
      cardCtnItems === "country" &&
      dispatch(setCountryCardClicked());
    cardClicked &&
      cardCtnItems != "country" &&
      dispatch(resetCountryCardClicked());
    cardClicked && cardCtnItems != "country" && dispatch(setFavCardClicked());
    cardClicked &&
      cardCtnItems === "country" &&
      dispatch(resetFavCardClicked());

    playerData && mainControlBtn && mainControlBtn.click();
  };

  const addFavorite = (item) => {
    const newFavorites = [...favorites, item];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const icon = favicon ? favicon : radioImg;

  return (
    <div
      className={`radio-card flex items-center justify-between relative w-full min-h-24 xs-c:w-60 xs-c:min-h-48 xs-c:flex-col p-3 bg-zinc-900  rounded-lg hover:cursor-pointer lg:hover:shadow-c-3 ${
        (clickedCardIndex === index &&
          pageNumber === activePage &&
          activeCountry === selectedCountry &&
          countryCardClicked) ||
        (clickedFavCardIndex === favoriteIndex &&
          favCardClicked &&
          cardCtnItems != "country")
          ? "shadow-c-5"
          : "shadow-c-4"
      }`}
      onClick={handleCardClick}
    >
      <i
        className="fa-solid fa-heart absolute inline-block text-white/20 text-xl left-14 bottom-0 xs-c:top-2 xs-c:right-4  "
        onClick={() =>
          addFavorite({ id, url, stationName, state, favicon, selectedCountry })
        }
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
            (clickedCardIndex === index &&
              pageNumber === activePage &&
              activeCountry === selectedCountry &&
              countryCardClicked &&
              playing) ||
            (clickedFavCardIndex === favoriteIndex &&
              favCardClicked &&
              cardCtnItems != "country")
              ? "hidden"
              : "block"
          }`}
        ></i>
        <i
          className={`fa-solid fa-circle-pause  text-5xl text-white opacity-40 absolute left-0 ${
            (clickedCardIndex === index &&
              pageNumber === activePage &&
              activeCountry === selectedCountry &&
              countryCardClicked &&
              playing) ||
            (clickedFavCardIndex === favoriteIndex &&
              favCardClicked &&
              cardCtnItems != "country")
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
