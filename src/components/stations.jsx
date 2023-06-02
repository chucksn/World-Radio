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
      {stations &&
        category === "country" &&
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
      {(loading || (stations && stations.length === 0)) &&
        category === "country" && (
          <LoadingAnimation
            loadingFailRef={loadingFailRef}
            loadingSvg={loadingSvg}
            stations={stations}
          />
        )}
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
    </>
  );
}

export default Stations;
