import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RadioStationCard from "../components/card";
import Pagination from "react-js-pagination";
import Player from "../components/player";
import loadingSvg from "../assets/tail-spin.svg";
import Hero from "../components/hero-section";
import { setFavorites } from "../redux/features/favoritesSlice";
import LoadingAnimation from "../components/loadingAnimation";

function Home() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [stations, setStations] = useState(null);
  const playerData = useSelector((state) => state.playerData);
  const [activePage, setActivePage] = useState(1);
  const [playing, setPlayStatus] = useState(false);
  const [paused, setPauseStatus] = useState(true);
  const [waiting, setWaitStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("country");
  const favorites = useSelector((state) => state.favorites);
  const stationsPerPage = 20;
  const [totalStation, setTotalStation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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

  const handlePlay = () => {
    setPlayStatus(true);
    setPauseStatus(false);
    setWaitStatus(false);
  };

  const handlePause = () => {
    setPlayStatus(false);
    setPauseStatus(true);
  };

  const handleWaiting = () => {
    setWaitStatus(true);
    setPauseStatus(false);
  };

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
              {category === "country" && "View Favorite"}
              {category === "favorite" && "Back to Country Stations"}
            </button>
          </div>
          <div className="card-container relative bg-black/50 shadow-c-1 flex flex-wrap mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  gap-4 xs-c:gap-8 lg:gap-12 justify-center items-center">
            {stations &&
              category === "country" &&
              stations.map((station) => {
                return (
                  <>
                    <RadioStationCard
                      id={station.id}
                      key={station.id}
                      favicon={station.favicon}
                      state={station.state}
                      stationName={station.name.slice(0, 36)}
                      url={station.urlResolved}
                      playing={playing}
                      paused={paused}
                      waiting={waiting}
                      category={category}
                    />
                  </>
                );
              })}

            {(loading || (stations && stations.length === 0)) &&
              category === "country" && (
                <LoadingAnimation
                  loadingFailRef={loadingFailRef}
                  loadingSvg={loadingSvg}
                  stations={stations}
                />
              )}

            {favorites &&
              favorites.length > 0 &&
              category === "favorite" &&
              favorites.map((favorite) => {
                return (
                  <>
                    <RadioStationCard
                      key={favorite.id}
                      favicon={favorite.favicon}
                      state={favorite.state}
                      stationName={favorite.stationName}
                      url={favorite.url}
                      selectedCountry={favorite.selectedCountry}
                      favoriteID={favorite.id}
                      playing={playing}
                      waiting={waiting}
                      paused={paused}
                    />
                  </>
                );
              })}

            {favorites && favorites.length === 0 && category === "favorite" && (
              <span className="block text-slate-400 text-center md:text-lg">
                Click on the grey heart icon on the station card to add/remove
                station to/from favorite.
              </span>
            )}
          </div>
          {stations && stations.length > 0 && category === "country" && (
            <Pagination
              key="pagination"
              activePage={activePage}
              onChange={handlePageChange}
              totalItemsCount={totalStation}
              itemsCountPerPage={stationsPerPage}
              pageRangeDisplayed={5}
              prevPageText={"< Prev"}
              nextPageText={"Next >"}
              itemClass={"item"}
            />
          )}
        </div>
        {playerData && (
          <Player
            key="player"
            onPlay={handlePlay}
            onPause={handlePause}
            onWaiting={handleWaiting}
            playing={playing}
            paused={paused}
            waiting={waiting}
            icon={playerData.favicon}
            state={playerData.state}
            country={playerData.selectedCountry}
            stationName={playerData.stationName.slice(0, 36)}
            url={playerData.url}
          />
        )}
      </div>
    </>
  );
}

export default Home;
