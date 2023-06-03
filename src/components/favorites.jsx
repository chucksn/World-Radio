import RadioStationCard from "./card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

function Favorites({ favorites, category, clickedCardId, setClickedCardId }) {
  const isLogged = useSelector((state) => state.isLogged);
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const totalStation = favorites && favorites.length;
  const stationsPerPage = 10;
  const startIndex = (currentPage - 1) * stationsPerPage;
  const endIndex = currentPage * stationsPerPage;
  const displayedFavorites = favorites && favorites.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const handleLoginBtn = () => {
    navigate("/sign-in");
  };
  return (
    <>
      {favorites &&
        favorites.length > 0 &&
        category === "favorite" &&
        displayedFavorites.map((favorite) => {
          return (
            <>
              <RadioStationCard
                key={favorite.id}
                favicon={favorite.favicon}
                state={favorite.state}
                stationName={favorite.stationName}
                url={favorite.url}
                playing={playing}
                waiting={waiting}
                paused={paused}
                category={category}
                country={favorite.country}
                id={favorite.id}
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
              />
            </>
          );
        })}

      {isLogged &&
        favorites &&
        favorites.length === 0 &&
        category === "favorite" && (
          <span className="block text-slate-400 text-center md:text-lg">
            Click on the grey heart icon on the station card to add/remove
            station to/from favorite.
          </span>
        )}

      {!isLogged && category === "favorite" && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-amber-300">
            Login to access your favorite station(s)
          </span>
          <button
            onClick={handleLoginBtn}
            className="favorite-country-toggle text-slate-200 bg-sky-900 mt-6 px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      )}

      {favorites && favorites.length > 0 && category === "favorite" && (
        <Pagination
          key="favorite-pagination"
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

export default Favorites;
