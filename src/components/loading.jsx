import loadingSvg from "../assets/loading2.svg";

function Loading({ width, height }) {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 ">
      <img
        src={loadingSvg}
        alt="loading"
        className="animate-spin-slow "
        width={width}
        height={height}
      />
    </div>
  );
}

export default Loading;
