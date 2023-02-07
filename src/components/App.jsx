import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./countrySelector";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "../redux/features/stationSlice";
import Footer from "./footer";
import RadioStationCard from "./card";
import Pagination from "react-js-pagination";
import Player from "./player";

function App() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.country);
  const stations = useSelector((state) => state.station);
  const playerData = useSelector((state) => state.playerData);
  const [activePage, setActivePage] = useState(1);
  const [playing, setPlayStatus] = useState(false);
  // const [paused, setPauseStatus] = useState(true);

  const [clickedCardIndex, setClickedCardIndex] = useState(null);

  useEffect(() => {
    const getStation = async () => {
      const api = new RadioBrowserApi("My Radio App");
      let station = await api.searchStations({
        languageExact: "english",
        hideBroken: true,
        removeDuplicates: true,
        countryCode: selectedCountry.value,
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
    selectedCountry && getStation();
  }, [selectedCountry]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo(0, 0, "smooth");
  };

  const handlePlay = () => {
    setPlayStatus(true);
  };

  const handlePause = () => {
    setPlayStatus(false);
  };

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
          <CountrySelector />
        </div>
        <div className="body-container w-full flex flex-col my-5 items-center lg:mt-12">
          <div className="hero-section relative w-11/12 min-h-32 md:min-h-40 lg:min-h-52 mb-4 lg:mb-8 rounded-xl bg-[url('../src/assets/radio-studio.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="hero-bg-overlay absolute w-full h-full top-0 bg-black/40 rounded-xl p-4 sm:p-6 lg:p-12">
              <div className="w-1/2 lg:w-1/4">
                <span className="hero-text1 block font-itim sm:text-xl lg:text-2xl text-gray-400">
                  Stream Over 5000 Radio Stations Worldwide{" "}
                  <span className="text-red-500 font-semibold">Live...</span>
                </span>
              </div>
            </div>
          </div>
          <span className="country font-ubuntu text-amber-400 md:text-xl">
            <i className="fa-solid fa-location-dot text-red-600 md:text-xl"></i>{" "}
            {selectedCountry.label}
          </span>
          <div className="card-container bg-black/50 shadow-c-1 flex flex-wrap mt-4 w-11/12 min-h-72 lg:min-h-96 p-3 xs-c:p-8 rounded-lg lg:mt-6  gap-4 xs-c:gap-8 lg:gap-12 justify-center">
            {displayedStations &&
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
                    />

                    {playerData && clickedCardIndex === index && (
                      <Player
                        onPlay={handlePlay}
                        onPause={handlePause}
                        icon={playerData.favicon}
                        state={playerData.state}
                        stationName={playerData.stationName}
                        url={playerData.url}
                      />
                    )}
                  </>
                );
              })}
          </div>
          {stations.length > 0 && (
            <Pagination
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
      </div>
    </>
  );
}

export default App;
