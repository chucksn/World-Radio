import { useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./components/countrySelector";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "./redux/features/stationSlice";

function App() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.country);
  const stationInfoList = useSelector((state) => state.station);

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

  return (
    <div className="main-container min-h-screen flex flex-col bg-gradient-to-r from-slate-600 to-gray-900 p-6 ">
      <div className="header flex flex-col items-center lg:flex-row justify-between">
        <div className="logo-container flex items-center bg-slate-900 p-2 rounded-xl shadow-c_1 mb-6 lg:mb-0">
          <h1 className="font-medium text-2xl font-unbounded text-cyan-500  md:text-3xl lg:text-4xl">
            World Radio
          </h1>
          <i className="fa-solid fa-radio text-2xl text-amber-600 ml-2 lg:text-3xl"></i>
        </div>
        <CountrySelector />
      </div>
      <div className="card-container lg:px-4"></div>
    </div>
  );
}

export default App;
