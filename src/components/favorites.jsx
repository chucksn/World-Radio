import RadioStationCard from "./card";

function Favorites({ favorites, category, paused, playing, waiting }) {
  return (
    <>
      {favorites &&
        favorites.length > 0 &&
        category === "favorite" &&
        favorites.map((favorite) => {
          return (
            <>
              <RadioStationCard
                key={favorite.id}
                favicon={favorite.favicon}
                state={favorite.state}
                stationName={favorite.stationName}
                url={favorite.url}
                selectedCountry={favorite.selectedCountry}
                favoriteID={favorite.id}
                playing={playing}
                waiting={waiting}
                paused={paused}
              />
            </>
          );
        })}

      {favorites && favorites.length === 0 && category === "favorite" && (
        <span className="block text-slate-400 text-center md:text-lg">
          Click on the grey heart icon on the station card to add/remove station
          to/from favorite.
        </span>
      )}
    </>
  );
}

export default Favorites;
