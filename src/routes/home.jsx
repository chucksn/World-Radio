import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "../components/hero-section";
import Stations from "../components/stations";
import Favorites from "../components/favorites";
import useCapitalize from "../hooks/useCapitalize";
import { useGetStationsQuery } from "../features/api/apiSlice";

function Home() {
  const country = useSelector((state) => state.country);
  const user = useSelector((state) => state.user);
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("country");
  const favorites = useSelector((state) => state.favorites);
  const stationsPerPage = 20;
  const [clickedCardId, setClickedCardId] = useState(null);
  const { extractFirstWord } = useCapitalize();
  const name = user && extractFirstWord(user.name);

  const { data, isLoading, isError, error, isFetching } = useGetStationsQuery([
    country.value,
    stationsPerPage,
    currentPage,
  ]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo(0, 0, "smooth");
  };

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const handleFavoriteBtnClick = () => {
    category === "country" ? setCategory("favorite") : setCategory("country");
    category === "favorite" ? setCategory("country") : setCategory("favorite");
  };

  useEffect(() => {
    setCategory("country");
  }, [country]);

  return (
    <>
      <div className="home w-full min-h-screen flex flex-col relative">
        <div className="body-container w-full flex flex-col mb-6 mt-8 items-center sm:mt-14">
          <Hero />
          <div className="country-favorite-txt-ctn w-full px-5 sm:px-10 md:px-14 lg:px-20  flex items-center  justify-between">
            {category === "country" && (
              <div className="location flex items-center mr-4">
                <i className="fa-solid fa-location-dot text-red-600 text-sm md:text-xl mr-1"></i>{" "}
                <span className="bg-neutral-800/80 text-amber-300 font-unbounded py-1 px-2 rounded-full text-xs md:text-[15px] text-center">
                  {country.label}
                </span>
              </div>
            )}
            {category === "favorite" && (
              <span className="bg-neutral-800/80 text-amber-300 font-unbounded py-1 px-2 rounded-full text-xs md:text-[0.85rem] lg:text-base text-center mr-4">
                {user && `${name}'s Favorite(s)`}
                {!user && "Favorite Station(s)"}
              </span>
            )}
            <button
              onClick={handleFavoriteBtnClick}
              className="favorite-country-toggle text-slate-200 bg-sky-900 shadow p-2 md:p-3 text-xs lg:text-sm rounded-lg font-unbounded lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              {category === "country" && "Favorite Station(s)"}
              {category === "favorite" && "Back to Searched Stations"}{" "}
              {favorites && favorites.length > 0 && category === "country" && (
                <span className="inline-block text-[yellow]">
                  {`- ${favorites.length}`}
                </span>
              )}
            </button>
          </div>

          <Stations
            key={"stations"}
            category={category}
            clickedCardId={clickedCardId}
            country={country}
            setClickedCardId={setClickedCardId}
            stations={data && data.stations}
            loading={isLoading}
            activePage={activePage}
            handlePageChange={handlePageChange}
            stationsPerPage={stationsPerPage}
            totalStation={data && data.totalStation}
            isError={isError}
            error={error}
            isFetching={isFetching}
          />

          <Favorites
            key={"favorites"}
            category={category}
            favorites={favorites}
            clickedCardId={clickedCardId}
            setClickedCardId={setClickedCardId}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
