function LoadingAnimation({ loadingSvg, loadingFailRef, stations }) {
  return (
    <div
      className={`absolute w-full h-full top-0 left-0 flex justify-center rounded-lg ${
        stations && stations.length > 0 ? "bg-black/60" : ""
      } `}
    >
      <img
        src={loadingSvg}
        alt="Loading..."
        className=" mb-8 md:mb-16 h-16 w-16 md:h-20 md:w-20 absolute top-20 "
      ></img>
      <span
        className="loading-fail-text hidden text-yellow-500 text-sm xs-c:text-base lg:text-lg text-center m-4"
        ref={loadingFailRef}
      >
        No available Station in selected Country at the moment
      </span>
    </div>
  );
}

export default LoadingAnimation;
