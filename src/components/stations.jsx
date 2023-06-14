import RadioStationCard from "./card";
import LoadingAnimation from "./loadingAnimation";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/other/activePage-mainSlice";
import { setCurrentPage } from "../features/other/currentPage-mainSlice";
import { useEffect } from "react";
import { useGetStationsQuery } from "../features/api/stationsApiSlice";

function Stations({ category, clickedCardId, setClickedCardId }) {
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);
  const activePage_main = useSelector((state) => state.activePage_main);
  const country = useSelector((state) => state.country);
  const currentPage_main = useSelector((state) => state.currentPage_main);
  const dispatch = useDispatch();
  const stationsPerPage = 20;

  const { data, isLoading, isError, error, isFetching } = useGetStationsQuery([
    country.value,
    stationsPerPage,
    currentPage_main,
  ]);

  const stations = data && data.stations;
  const totalStation = data && data.totalStation;

  const handlePageChange = (pageNumber) => {
    dispatch(setActivePage(pageNumber));
    window.scrollTo(0, 0, "smooth");
  };

  useEffect(() => {
    dispatch(setCurrentPage(activePage_main));
  }, [activePage_main]);

  return (
    <>
      {category === "country" && (
        <div className="card-container relative bg-black/50 shadow-c-teal flex flex-col mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  items-center">
          <div className="card-container-main flex flex-wrap gap-4 xs-c:gap-8 lg:gap-12 justify-center ">
            {stations &&
              stations.map((station) => {
                return (
                  <>
                    <RadioStationCard
                      id={station._id}
                      clickedCardId={clickedCardId}
                      setClickedCardId={setClickedCardId}
                      key={station._id}
                      favicon={station.favicon}
                      state={station.state}
                      country={country}
                      stationName={station.name.slice(0, 36)}
                      url={station.url_resolved}
                      playing={playing}
                      paused={paused}
                      waiting={waiting}
                      category={category}
                    />
                  </>
                );
              })}
            {(isLoading ||
              isFetching ||
              (stations && stations.length === 0)) && (
              <LoadingAnimation
                stations={stations}
                isError={isError}
                error={error}
                category={category}
                country={country}
                key={"loading-animation"}
              />
            )}
          </div>

          {stations && stations.length > 0 && (
            <Pagination
              key="pagination"
              activePage={activePage_main}
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
      )}
    </>
  );
}

export default Stations;
