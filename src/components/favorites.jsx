import RadioStationCard from "./card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import useVerification from "../hooks/useVerification";

function Favorites({ category, clickedCardId, setClickedCardId }) {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const isVerified = useSelector((state) => state.isVerified);
  const playing = useSelector((state) => state.playing);
  const paused = useSelector((state) => state.paused);
  const waiting = useSelector((state) => state.waiting);
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const [favActivePage, setFavActivePage] = useState(1);
  const [favCurrentPage, setFavCurrentPage] = useState(1);
  const { resendVerification } = useVerification();

  const totalStation = favorites && favorites.length;
  const stationsPerPage = 10;
  const startIndex = (favCurrentPage - 1) * stationsPerPage;
  const endIndex = favCurrentPage * stationsPerPage;
  const displayedFavorites = favorites && favorites.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setFavActivePage(pageNumber);
  };

  useEffect(() => {
    setFavCurrentPage(favActivePage);
  }, [favActivePage]);

  const handleLoginBtn = () => {
    navigate("/sign-in");
  };

  const handleResendVerification = () => {
    resendVerification();
  };

  return (
    <>
      {category === "favorite" && (
        <div className="card-container relative bg-black/50 shadow-c-teal flex flex-col mt-4 w-11/12 min-h-60 lg:min-h-64 p-3 xs-c:p-8 rounded-lg lg:mt-6  ">
          <div className="car-container-main flex flex-wrap gap-4 xs-c:gap-8 lg:gap-12 justify-center">
            {favorites &&
              favorites.length > 0 &&
              displayedFavorites.map((favorite) => {
                return (
                  <>
                    <RadioStationCard
                      key={favorite.id}
                      favicon={favorite.favicon}
                      state={favorite.state}
                      stationName={favorite.stationName}
                      url={favorite.url}
                      countryCode={favorite.countryCode}
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

            {isLogged && favorites && favorites.length === 0 && (
              <span className="block text-slate-400 text-center md:text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Click on the grey heart icon on the station card to add/remove
                station to/from favorite.
              </span>
            )}

            {!isLogged && (
              <div className="not-logged-display w-full h-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-amber-300">
                  Login to access your favorite station(s)
                </span>
                <button
                  onClick={handleLoginBtn}
                  className="favorite-country-toggle text-slate-200 bg-sky-900 mt-6 px-3 py-2 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
                >
                  Login
                </button>
              </div>
            )}
            {isLogged && !isVerified && (
              <div className="not-verified-display w-full h-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-green-300">VERIFY YOUR ACCOUNT</span>
                <span className="text-slate-300 mt-2 text-center text-sm sm:text-base mx-2">
                  Click the verification link on the verification email sent to
                  your email address
                </span>
                <button
                  onClick={handleResendVerification}
                  className="favorite-country-toggle text-slate-200 bg-sky-900 mt-6 px-3 py-2 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
                >
                  Resend Verification Email
                </button>
              </div>
            )}
          </div>

          {favorites && favorites.length > 0 && (
            <div className=" flex justify-center">
              <Pagination
                key="favorite-pagination"
                activePage={favActivePage}
                onChange={handlePageChange}
                totalItemsCount={totalStation}
                itemsCountPerPage={stationsPerPage}
                pageRangeDisplayed={5}
                prevPageText={"< Prev"}
                nextPageText={"Next >"}
                itemClass={"item"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Favorites;
