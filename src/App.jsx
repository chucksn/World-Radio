import { useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./components/countrySelector";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "./redux/features/stationSlice";

function App() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.country);
  const searchedStation = useSelector((state) => state.station);

  useEffect(() => {
    const getStation = async () => {
      const api = new RadioBrowserApi("My Radio App");
      let station = await api.searchStations({
        languageExact: "english",
        hideBroken: true,
        removeDuplicates: true,
        countryCode: selectedCountry.value,
        limit: 100,
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
    };
    selectedCountry && getStation();
  }, [selectedCountry]);

  console.log(selectedCountry);
  console.log(searchedStation);

  return (
    <>
      <CountrySelector />
    </>
  );
}

export default App;
