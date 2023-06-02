import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RadioStationCard from "../components/card";
import Pagination from "react-js-pagination";
import Player from "../components/player";
import loadingSvg from "../assets/tail-spin.svg";
import Hero from "../components/hero-section";
import { setFavorites } from "../redux/features/favoritesSlice";
import LoadingAnimation from "../components/loadingAnimation";
import Stations from "../components/stations";
import Favorites from "../components/favorites";

function Home() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [stations, setStations] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("country");
  const favorites = useSelector((state) => state.favorites);
  const stationsPerPage = 20;
  const [totalStation, setTotalStation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(null);

  const loadingFailRef = useRef();

  useEffect(() => {
    setStations(null);
    setActivePage(1);
    setCurrentPage(1);
    setLoading(true);
    const getStation = async () => {
      const response = await fetch(
        `${baseURL}/api/v1/stations?countryCode=${country.value}&limit=${stationsPerPage}&page=${currentPage}`
      );
      const data = await response.json();
      setStations(data.stations);
      setTotalStation(data.totalStation);
      setLoading(false);
    };
    country && getStation();
  }, [country]);

  useEffect(() => {
    setHasMounted(true);
    setLoading(true);
    const getStation = async () => {
      const response = await fetch(
        `${baseURL}/api/v1/stations?countryCode=${country.value}&limit=${stationsPerPage}&page=${currentPage}`
      );
      const data = await response.json();
      setStations(data.stations);
      setTotalStation(data.totalStation);
      setLoading(false);
    };
    hasMounted && getStation();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo(0, 0, "smooth");
  };

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const handleFavoriteBtnClick = () => {
    category === "country" ? setCategory("favorite") : setCategory("country");
  };

  useEffect(() => {
    if (hasMounted) {
      setTimeout(() => {
        if (loadingFailRef.current) {
          loadingFailRef.current.style.display = "block";
        }
      }, 10000);
    }
  }, [country, category]);

  return (
    <>
      <div className="home w-full min-h-screen flex flex-col relative">
        <div className="body-container w-full flex flex-col my-6 items-center lg:mt-14">
          <Hero />
          <div className="country-favorite-txt-ctn w-full px-10 lg:px-20  flex items-center  justify-between">
            {category === "country" && (
              <span className="country font-unbounded text-amber-300 text-sm md:text-base">
                <i className="fa-solid fa-location-dot text-red-600 md:text-xl"></i>{" "}
                <span className="bg-neutral-800/80 py-1 px-2 rounded-md">
                  {country.label}
                </span>
              </span>
            )}
            {category === "favorite" && (
              <span className="font-unbounded text-amber-400 text-sm md:text-lg">
                Favorite Stations
              </span>
            )}
            <button
              onClick={handleFavoriteBtnClick}
              className="favorite-country-toggle text-slate-200 bg-sky-900 p-2 md:p-3 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              {category === "country" && "Favorite Stations"}
              {category === "favorite" && "Back to Searched Stations"}
              {favorites && favorites.length > 0 && category === "country" && (
                <span className="inline-block text-amber-400">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          <div className="card-container relative bg-black/50 shadow-c-teal flex flex-wrap mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  gap-4 xs-c:gap-8 lg:gap-12 justify-center items-center">
            <Stations
              key={"stations"}
              category={category}
              clickedCardId={clickedCardId}
              country={country}
              setClickedCardId={setClickedCardId}
              stations={stations}
              loading={loading}
              loadingFailRef={loadingFailRef}
              loadingSvg={loadingSvg}
              activePage={activePage}
              handlePageChange={handlePageChange}
              stationsPerPage={stationsPerPage}
              totalStation={totalStation}
            />

            <Favorites
              key={"favorites"}
              category={category}
              favorites={favorites}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
