import loadingSvg from "../assets/tail-spin.svg";
import { useEffect, useState } from "react";

function LoadingAnimation({ category, country, stations, isError, error }) {
  const [failedLoadingTxt, setFailedLoadingTxt] = useState(false);

  useEffect(() => {
    if (stations && stations.length === 0) {
      setTimeout(() => {
        setFailedLoadingTxt(true);
      }, 5000);
    }
  }, [country, category, stations]);
  return (
    <div
      className={`absolute w-full h-full top-0 left-0 flex justify-center rounded-lg ${
        failedLoadingTxt ? "items-end" : "items-center"
      } ${stations && stations.length > 0 ? "bg-black/60" : ""} `}
    >
      <img
        src={loadingSvg}
        alt="Loading..."
        className=" mb-8 md:mb-16 h-16 w-16 md:h-20 md:w-20 absolute top-20 "
      ></img>
      {failedLoadingTxt && (
        <span className="loading-fail-text text-yellow-500 text-sm xs-c:text-base lg:text-lg text-center m-4">
          No available Station in selected Country at the moment
        </span>
      )}

      {isError && (
        <span className="error text-yellow-500 text-sm xs-c:text-base lg:text-lg text-center m-4">
          {error}
        </span>
      )}
    </div>
  );
}

export default LoadingAnimation;
