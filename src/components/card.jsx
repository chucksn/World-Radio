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
import useFavorites from "../hooks/useFavorites";
import radioImg from "../assets/radio2.jpg";
import tailSpin from "../assets/tail-spin.svg";
import { useNavigate } from "react-router-dom";

function RadioStationCard({
  id,
  clickedCardId,
  setClickedCardId,
  url,
  stationName,
  state,
  country,
  favicon,
  category,
  countryCode,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerData = useSelector((state) => state.playerData);
  const favCardClicked = useSelector((state) => state.favCardClicked);
  const countryCardClicked = useSelector((state) => state.countryCardClicked);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.isLogged);
  const playing = useSelector((state) => state.playing);
  const waiting = useSelector((state) => state.waiting);
  const [isMatched, setIsMatched] = useState(false);
  const { addFavorite, getFavorites, removeFavorite } = useFavorites();

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

  useEffect(() => {
    const stationInFavorite =
      favorites && favorites.some((favorite) => favorite.id === id);
    stationInFavorite ? setIsMatched(true) : setIsMatched(false);
  }, [favorites]);

  const handleFavIconClick = async (event) => {
    event.stopPropagation();
    const newFavoriteData = {
      url,
      stationName,
      state,
      country: country.label,
      countryCode: country.value,
      favicon,
      id,
    };

    if (isLogged && user) {
      isMatched
        ? await removeFavorite(user.token, id)
        : await addFavorite(user.token, newFavoriteData);
      await getFavorites(user.token);
    } else {
      navigate("/sign-in");
    }
  };

  const icon = favicon ? favicon : radioImg;

  return (
    <div
      className={`radio-card flex items-center justify-between relative w-full min-h-24 xs-c:w-60 xs-c:min-h-48 xs-c:flex-col p-3 bg-zinc-900  rounded-lg hover:cursor-pointer ${
        clickedCardId === id ? "" : "lg:hover:shadow-c-blue"
      }  ${
        (countryCardClicked &&
          clickedCardId === id &&
          category === "country") ||
        (favCardClicked && clickedCardId === id && category === "favorite")
          ? "shadow-c-lime"
          : "shadow-c-thin-white"
      }`}
      onClick={handleCardClick}
    >
      <div
        className={`favorite absolute w-8 h-8 flex justify-center items-center text-xl cursor-default left-12 bottom-0 xs-c:top-2 xs-c:right-4 ${
          isMatched ? "text-sky-700/80" : "text-white/20"
        }`}
        onClick={(event) => handleFavIconClick(event)}
      >
        <i className="fa-solid fa-heart "></i>
      </div>
      <img
        src={icon}
        alt="favicon"
        className="favicon w-10 h-10 xs-c:w-16 xs-c:h-16 rounded-full xs-c:mb-2 "
      />
      <div className=" card-info flex flex-col justify-center max-w-48 text-center">
        <span className="station-name block text-slate-200 font-unbounded text-[0.7rem]">
          {stationName}
        </span>
        <span className="state-country-txt block text-green-200 text-[0.7rem] font-unbounded mt-1">
          {state && `${state}, `}
          {country.value || countryCode}
        </span>
      </div>
      <div className="control-display relative w-12 h-12 xs-c:mt-2">
        <i
          className={`fa-solid fa-circle-play text-5xl text-white opacity-40 absolute left-0 ${
            (countryCardClicked &&
              clickedCardId === id &&
              category === "country" &&
              playing) ||
            (favCardClicked &&
              clickedCardId === id &&
              category === "favorite" &&
              playing)
              ? "hidden"
              : "block"
          }`}
        ></i>
        <i
          className={`fa-solid fa-circle-pause  text-5xl text-white opacity-40 absolute left-0 ${
            (countryCardClicked &&
              clickedCardId === id &&
              category === "country" &&
              playing) ||
            (favCardClicked &&
              clickedCardId === id &&
              category === "favorite" &&
              playing)
              ? "block"
              : "hidden"
          }`}
        ></i>
        {((countryCardClicked &&
          clickedCardId === id &&
          category === "country" &&
          !playing &&
          waiting) ||
          (favCardClicked &&
            clickedCardId === id &&
            category === "favorite" &&
            !playing &&
            waiting)) && <img src={tailSpin} alt="spin" />}
      </div>
    </div>
  );
}

export default RadioStationCard;
