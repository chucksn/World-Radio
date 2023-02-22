import { useEffect, useState, useRef } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./countrySelector";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "../redux/features/stationSlice";
import Footer from "./footer";
import RadioStationCard from "./card";
import Pagination from "react-js-pagination";
import Player from "./player";
import AboutModal from "./aboutModal";
import tailSpin from "../assets/tail-spin.svg";

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
  const [aboutToggle, setAboutToggle] = useState(false);

  const loadingAnimationRef = useRef();
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

  useEffect(() => {
    if (stations && stations.length <= 0) {
      setTimeout(() => {
        if (loadingAnimationRef.current && loadingFailRef.current) {
          loadingAnimationRef.current.style.display = "none";
          loadingFailRef.current.style.display = "block";
        }
      }, 10000);
    }
  }, [country]);

  useEffect(() => {
    country && setSelectedCountry(country.label);
  }, [country]);

  const cardsPerPage = 20;
  const displayedStations =
    stations &&
    stations.slice((activePage - 1) * cardsPerPage, activePage * cardsPerPage);

  return (
    <>
      <div className="main-container w-full min-h-screen flex flex-col bg-gradient-to-r from-slate-600 to-gray-900 pb-72 relative">
        <div className="header flex flex-col items-center p-6 justify-between lg:flex-row bg-slate-400/5 shadow ">
          <div className="logo-container flex items-center bg-slate-900 p-2 rounded-xl shadow-c-1 mb-6 lg:mb-0">
            <h1 className="font-medium text-2xl font-unbounded text-cyan-500  md:text-3xl lg:text-4xl">
              World Radio
            </h1>
            <i className="fa-solid fa-radio text-2xl text-amber-600 ml-2 lg:text-3xl"></i>
          </div>
          <span
            className="about font-unbounded text-teal-500 block pb-4 text-sm cursor-pointer"
            onClick={handleAboutClick}
          >
            ABOUT APP{" "}
            {!aboutToggle && (
              <i className="fa-solid fa-circle-chevron-down"></i>
            )}
            {aboutToggle && <i className="fa-solid fa-circle-chevron-up "></i>}
          </span>
          <CountrySelector />
        </div>
        <div className="body-container w-full flex flex-col my-5 items-center lg:mt-12">
          <div className="hero-section relative w-11/12 min-h-32 md:min-h-40 lg:min-h-52 mb-4 lg:mb-8 rounded-xl bg-[url('../src/assets/radio-studio.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="hero-bg-overlay absolute w-full h-full top-0 bg-black/40 rounded-xl p-4 sm:p-6 lg:p-12">
              <div className="w-1/2 lg:w-1/4">
                <span className="hero-text1 block font-unbounded text-sm lg:text-lg lg:max-w-56 text-gray-300">
                  Stream Over 5000 Radio Stations Worldwide{" "}
                  <span className="text-red-500 font-semibold">Live...</span>
                </span>
              </div>
            </div>
          </div>
          <span className="country font-ubuntu text-amber-400 md:text-xl">
            <i className="fa-solid fa-location-dot text-red-600 md:text-xl"></i>{" "}
            {country.label}
          </span>
          <div className="card-container bg-black/50 shadow-c-1 flex flex-wrap mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  gap-4 xs-c:gap-8 lg:gap-12 justify-center items-center">
            {stations.length <= 0 && (
              <>
                <img
                  src={tailSpin}
                  alt="Loading..."
                  ref={loadingAnimationRef}
                ></img>
                <span
                  className="loading-fail-text hidden text-yellow-500 text-sm xs-c:text-base lg:text-lg text-center"
                  ref={loadingFailRef}
                >
                  No available Station in selected Country at the moment
                </span>
              </>
            )}

            {displayedStations.length > 0 &&
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
                      stationName={station.name}
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
                    />
                  </>
                );
              })}
          </div>
          {stations.length > 0 && (
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
