import { useEffect, useState, useRef } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "../redux/features/stationSlice";
import Footer from "./footer";
import RadioStationCard from "./card";
import Pagination from "react-js-pagination";
import Player from "./player";
import AboutModal from "./aboutModal";
import tailSpin from "../assets/tail-spin.svg";
import Hero from "./hero-section";
import Header from "./header";
import { setFavorites } from "../redux/features/favoritesSlice";

function App() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const stations = useSelector((state) => state.station);
  const playerData = useSelector((state) => state.playerData);
  const [activePage, setActivePage] = useState(1);
  const [playing, setPlayStatus] = useState(false);
  const [paused, setPauseStatus] = useState(true);
  const [waiting, setWaitStatus] = useState(false);
  const [pageNumber, setPageNumber] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [activeCountry, setActiveCountry] = useState("United States");
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const [clickedFavCardIndex, setClickedFavCardIndex] = useState(null);
  const [aboutToggle, setAboutToggle] = useState(false);
  const [cardCtnItems, setCardCtnItems] = useState("country");
  const favorites = useSelector((state) => state.favorites);

  const loadingFailRef = useRef();

  useEffect(() => {
    const getStation = async () => {
      const api = new RadioBrowserApi("My Radio App");
      api.setBaseUrl("https://de1.api.radio-browser.info");
      let station = await api.searchStations({
        languageExact: "english",
        hideBroken: true,
        removeDuplicates: true,
        countryCode: country.value,
      });

      // The logic below prevents non-serializable value error
      station = station.map((s) => ({
        ...s,
        lastChangeTime: s.lastChangeTime.toString(),
        lastCheckOkTime: s.lastCheckOkTime.toString(),
        lastCheckTime: s.lastCheckTime.toString(),
        lastLocalCheckTime: s.lastLocalCheckTime.toString(),
        clickTimestamp: s.clickTimestamp.toString(),
      }));
      dispatch(setStation(station));
      setActivePage(1);
    };
    country && getStation();
  }, [country]);

  const handleAboutClick = () => {
    setAboutToggle(!aboutToggle);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo(0, 0, "smooth");
  };

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

  const handleClickFavorite = () => {
    cardCtnItems === "country"
      ? setCardCtnItems("favorite")
      : setCardCtnItems("country");
  };

  useEffect(() => {
    if (stations && stations.length <= 0) {
      setTimeout(() => {
        if (loadingFailRef.current) {
          loadingFailRef.current.style.display = "block";
        }
      }, 10000);
    }
  }, [country, cardCtnItems]);

  useEffect(() => {
    country && setSelectedCountry(country.label);
  }, [country]);

  // Load favorites from local storage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("radio-app-favorites-data");
    if (storedFavorites) {
      dispatch(setFavorites(JSON.parse(storedFavorites)));
    }
  }, []);

  const cardsPerPage = 20;
  const displayedStations =
    stations &&
    stations.slice((activePage - 1) * cardsPerPage, activePage * cardsPerPage);

  return (
    <>
      <div className="main-container w-full min-h-screen flex flex-col bg-gradient-to-r from-slate-600 to-gray-900 pb-72 relative">
        <Header aboutToggle={aboutToggle} onAboutClick={handleAboutClick} />
        <div className="body-container w-full flex flex-col my-5 items-center lg:mt-12">
          <Hero />
          <div className="country-favorite-txt-ctn w-full px-10 lg:px-20  flex items-center  justify-between">
            {cardCtnItems === "country" && (
              <span className="country font-unbounded text-amber-400 text-sm md:text-lg">
                <i className="fa-solid fa-location-dot text-red-500 md:text-xl"></i>{" "}
                {country.label}
              </span>
            )}
            {cardCtnItems === "favorite" && (
              <span className="font-unbounded text-amber-400 text-sm md:text-lg">
                Favorite Stations
              </span>
            )}
            <button
              onClick={handleClickFavorite}
              className="favorite-country-toggle text-slate-200 bg-sky-900 p-2 md:p-3 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              {cardCtnItems === "country" && "Show Favorite"}
              {cardCtnItems === "favorite" && "Back to Country Stations"}
            </button>
          </div>
          <div className="card-container bg-black/50 shadow-c-1 flex flex-wrap mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  gap-4 xs-c:gap-8 lg:gap-12 justify-center items-center">
            {cardCtnItems === "country" && stations.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <img
                  src={tailSpin}
                  alt="Loading..."
                  className="mb-8 md:mb-16"
                ></img>
                <span
                  className="loading-fail-text hidden text-yellow-500 text-sm xs-c:text-base lg:text-lg text-center"
                  ref={loadingFailRef}
                >
                  No available Station in selected Country at the moment
                </span>
              </div>
            )}

            {displayedStations.length > 0 &&
              cardCtnItems === "country" &&
              displayedStations.map((station, index) => {
                return (
                  <>
                    <RadioStationCard
                      id={station.id}
                      index={index}
                      setClickedCardIndex={setClickedCardIndex}
                      key={station.id}
                      favicon={station.favicon}
                      state={station.state}
                      stationName={station.name.slice(0, 36)}
                      url={station.urlResolved}
                      clickedCardIndex={clickedCardIndex}
                      playing={playing}
                      paused={paused}
                      waiting={waiting}
                      activePage={activePage}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      selectedCountry={selectedCountry}
                      activeCountry={activeCountry}
                      setActiveCountry={setActiveCountry}
                      cardCtnItems={cardCtnItems}
                    />
                  </>
                );
              })}
            {favorites &&
              favorites.length > 0 &&
              cardCtnItems === "favorite" &&
              favorites.map((favorite, index) => {
                return (
                  <>
                    <RadioStationCard
                      key={favorite.id}
                      favicon={favorite.favicon}
                      state={favorite.state}
                      stationName={favorite.stationName}
                      url={favorite.url}
                      selectedCountry={favorite.selectedCountry}
                      favoriteIndex={index}
                      clickedFavCardIndex={clickedFavCardIndex}
                      setClickedFavCardIndex={setClickedFavCardIndex}
                      favoriteID={favorite.id}
                      playing={playing}
                      waiting={waiting}
                      paused={paused}
                    />
                  </>
                );
              })}
            {favorites &&
              favorites.length === 0 &&
              cardCtnItems === "favorite" && (
                <span className="block text-slate-400 text-center md:text-lg">
                  Click on the grey heart icon on the station card to add or
                  remove station to favorite.
                </span>
              )}
          </div>
          {stations.length > 0 && cardCtnItems === "country" && (
            <Pagination
              key="pagination"
              activePage={activePage}
              onChange={handlePageChange}
              totalItemsCount={stations.length}
              itemsCountPerPage={cardsPerPage}
              pageRangeDisplayed={5}
              prevPageText={"< Prev"}
              nextPageText={"Next >"}
              itemClass={"item"}
            />
          )}
        </div>
        <Footer />
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
      {aboutToggle && <AboutModal setAboutToggle={setAboutToggle} />}
    </>
  );
}

export default App;
