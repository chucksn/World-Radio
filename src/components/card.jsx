import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPlayerData } from "../redux/features/playerDataSlice";
import {
  setFavCardClicked,
  resetFavCardClicked,
} from "../redux/features/favCardClickSlice";
import {
  setCountryCardClicked,
  resetCountryCardClicked,
} from "../redux/features/countryCardClickSlice";
import { setFavorites } from "../redux/features/favoritesSlice";
import radioImg from "../assets/radio2.jpg";
import tailSpin from "../assets/tail-spin.svg";

function RadioStationCard({
  id,
  clickedCardId,
  setClickedCardId,
  url,
  stationName,
  state,
  country,
  favicon,
  playing,
  paused,
  waiting,
  category,
  favoriteID,
}) {
  const dispatch = useDispatch();
  const playerData = useSelector((state) => state.playerData);
  const favCardClicked = useSelector((state) => state.favCardClicked);
  const countryCardClicked = useSelector((state) => state.countryCardClicked);
  const favorites = useSelector((state) => state.favorites);
  const [isIdMatched, setIsIdMatched] = useState(false);

  const mainControlBtn = document.querySelector(".rhap_play-pause-button");

  const handleCardClick = () => {
    setClickedCardId(id);
    dispatch(
      setPlayerData({
        url,
        stationName,
        state,
        favicon,
        id,
        country: country.label,
      })
    );

    if (category === "country") {
      dispatch(setCountryCardClicked());
      dispatch(resetFavCardClicked());
    } else {
      dispatch(resetCountryCardClicked());
      dispatch(setFavCardClicked());
    }
    playerData && mainControlBtn && mainControlBtn.click();
  };

  const add_removeFavorite = (event, item) => {
    event.stopPropagation();
  };

  const icon = favicon ? favicon : radioImg;

  return (
    <div
      className={`radio-card flex items-center justify-between relative w-full min-h-24 xs-c:w-60 xs-c:min-h-48 xs-c:flex-col p-3 bg-zinc-900  rounded-lg hover:cursor-pointer ${
        clickedCardId === id ? "" : "lg:hover:shadow-c-blue"
      }  ${
        (countryCardClicked && clickedCardId === id) ||
        (favCardClicked && category != "country")
          ? "shadow-c-lime"
          : "shadow-c-thin-white"
      }`}
      onClick={handleCardClick}
    >
      <div
        className={`favorite absolute w-8 h-8 flex justify-center items-center text-xl cursor-default left-12 bottom-0 xs-c:top-2 xs-c:right-4 ${
          isIdMatched || favoriteID ? "text-sky-700/80" : "text-white/20"
        }`}
        onClick={(event) => add_removeFavorite(event)}
      >
        <i className="fa-solid fa-heart "></i>
      </div>
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
            (countryCardClicked && clickedCardId === id && playing) ||
            (favCardClicked && playing && category != "country")
              ? "hidden"
              : "block"
          }`}
        ></i>
        <i
          className={`fa-solid fa-circle-pause  text-5xl text-white opacity-40 absolute left-0 ${
            (countryCardClicked && clickedCardId === id && playing) ||
            (favCardClicked && playing && category != "country")
              ? "block"
              : "hidden"
          }`}
        ></i>
        {((countryCardClicked && !playing && waiting && clickedCardId === id) ||
          (favCardClicked && !playing && waiting && category != "country")) && (
          <img src={tailSpin} alt="spin" />
        )}
      </div>
    </div>
  );
}

export default RadioStationCard;
