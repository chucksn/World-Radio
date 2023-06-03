import RadioStationCard from "./card";
import LoadingAnimation from "./loadingAnimation";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";

function Stations({
  stations,
  category,
  clickedCardId,
  setClickedCardId,
  country,
  loadingFailRef,
  loadingSvg,
  loading,
  activePage,
  handlePageChange,
  totalStation,
  stationsPerPage,
}) {
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);

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
            {(loading || (stations && stations.length === 0)) && (
              <LoadingAnimation
                loadingFailRef={loadingFailRef}
                loadingSvg={loadingSvg}
                stations={stations}
              />
            )}
          </div>

          {stations && stations.length > 0 && (
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
      )}
    </>
  );
}

export default Stations;
