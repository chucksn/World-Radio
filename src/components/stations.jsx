import RadioStationCard from "./card";
import LoadingAnimation from "./loadingAnimation";
import Pagination from "react-js-pagination";

function Stations({
  stations,
  category,
  clickedCardId,
  setClickedCardId,
  country,
  paused,
  playing,
  waiting,
  loadingFailRef,
  loadingSvg,
  loading,
  activePage,
  handlePageChange,
  totalStation,
  stationsPerPage,
}) {
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
