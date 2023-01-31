import { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./components/countrySelector";
import { useSelector } from "react-redux";

function App() {
  const [station, setStation] = useState(null);
  const selectedCountry = useSelector((state) => state.country);

  useEffect(() => {
    const getStation = async () => {
      const api = new RadioBrowserApi("My Radio App");
      const station = await api.searchStations({
        language: "english",
        hideBroken: true,
        country: selectedCountry.label,
        limit: 100,
      });
      setStation(station);
    };
    selectedCountry && getStation();
  }, [selectedCountry]);

  console.log(station);

  return (
    <>
      <CountrySelector />
    </>
  );
}

export default App;
