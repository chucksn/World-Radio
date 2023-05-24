import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { setFavorites } from "../redux/features/favoritesSlice";
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
  cardCtnItems,
  setClickedFavCardIndex,
  clickedFavCardIndex,
  favoriteIndex,
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
    dispatch(setCardClicked());
    dispatch(
      setPlayerData({ url, stationName, state, favicon, id, selectedCountry })
    );

    if (cardCtnItems === "country") {
      setActiveCountry(selectedCountry);
      setClickedCardIndex(index);
      setPageNumber(activePage);
      dispatch(setCountryCardClicked());
      dispatch(resetFavCardClicked());
    } else {
      setClickedFavCardIndex(favoriteIndex);
      dispatch(resetCountryCardClicked());
      dispatch(setFavCardClicked());
    }
    playerData && mainControlBtn && mainControlBtn.click();
  };

  const add_removeFavorite = (e, item) => {
    e.stopPropagation();
    if (!isIdMatched && cardCtnItems === "country") {
      const newFavorites = [...favorites, item];
      dispatch(setFavorites(newFavorites));
      localStorage.setItem(
        "radio-app-favorites-data",
        JSON.stringify(newFavorites)
      );
    } else if (isIdMatched) {
      const newFavorites = favorites.filter((favorite) => favorite.id !== id);
      dispatch(setFavorites(newFavorites));
      localStorage.setItem(
        "radio-app-favorites-data",
        JSON.stringify(newFavorites)
      );
      setIsIdMatched(false);
    } else if (cardCtnItems !== "country") {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== favoriteID
      );
      dispatch(setFavorites(newFavorites));
      localStorage.setItem(
        "radio-app-favorites-data",
        JSON.stringify(newFavorites)
      );
    }
  };

  useEffect(() => {
    favorites &&
      favorites.find((favorite) => favorite.id === id && setIsIdMatched(true));
  }, [favorites]);

  const icon = favicon ? favicon : radioImg;

  return (
    <div
      className={`radio-card flex items-center justify-between relative w-full min-h-24 xs-c:w-60 xs-c:min-h-48 xs-c:flex-col p-3 bg-zinc-900  rounded-lg hover:cursor-pointer lg:hover:shadow-c-blue ${
        (clickedCardIndex === index &&
          pageNumber === activePage &&
          activeCountry === selectedCountry &&
          countryCardClicked) ||
        (clickedFavCardIndex === favoriteIndex &&
          favCardClicked &&
          cardCtnItems != "country")
          ? "shadow-c-3"
          : "shadow-c-4"
      }`}
      onClick={handleCardClick}
    >
      <div
        className={`absolute w-8 h-8 flex justify-center items-center text-xl cursor-default left-12 bottom-0 xs-c:top-2 xs-c:right-4 ${
          isIdMatched || favoriteID ? "text-sky-700/80" : "text-white/20"
        }`}
        onClick={(e) =>
          add_removeFavorite(e, {
            id,
            url,
            stationName,
            state,
            favicon,
            selectedCountry,
          })
        }
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
            (clickedCardIndex === index &&
              pageNumber === activePage &&
              activeCountry === selectedCountry &&
              countryCardClicked &&
              playing) ||
            (clickedFavCardIndex === favoriteIndex &&
              favCardClicked &&
              playing &&
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
              playing &&
              cardCtnItems != "country")
              ? "block"
              : "hidden"
          }`}
        ></i>
        {(clickedCardIndex === index &&
          pageNumber === activePage &&
          activeCountry === selectedCountry &&
          !playing &&
          waiting) ||
          (clickedFavCardIndex === favoriteIndex &&
            favCardClicked &&
            !playing &&
            waiting &&
            cardCtnItems != "country" && <img src={tailSpin} alt="spin" />)}
      </div>
    </div>
  );
}

export default RadioStationCard;
