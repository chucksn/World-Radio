import { useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import CountrySelector from "./countrySelector";
import { useSelector, useDispatch } from "react-redux";
import { setStation } from "../redux/features/stationSlice";
import Footer from "./footer";
import RadioStationCard from "./card";

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

  const list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="main-container w-full min-h-screen flex flex-col bg-gradient-to-r from-slate-600 to-gray-900 p-6 pb-48 relative">
      <div className="header flex flex-col items-center lg:flex-row justify-between">
        <div className="logo-container flex items-center bg-slate-900 p-2 rounded-xl shadow-c-1 mb-6 lg:mb-0">
          <h1 className="font-medium text-2xl font-unbounded text-cyan-500  md:text-3xl lg:text-4xl">
            World Radio
          </h1>
          <i className="fa-solid fa-radio text-2xl text-amber-600 ml-2 lg:text-3xl"></i>
        </div>
        <CountrySelector />
      </div>
      <div className="body-container w-full flex flex-col mt-5 items-center lg:mt-12">
        <span className="country text-lg font-ubuntu text-amber-200 md:text-xl lg:text-2xl">
          Spain
        </span>
        <div className="card-container flex flex-wrap mt-4 lg:px-4 mt-6 gap-8 justify-center">
          {list.map((value, index) => (
            <RadioStationCard key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
