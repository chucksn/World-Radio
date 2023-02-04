import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function RadioStationCard() {
  return (
    <div className="radio-card flex items-center justify-between w-full h-24 xs-c:w-60 xs-c:h-48 xs-c:flex-col text-center p-3 bg-zinc-900 shadow-c-4 rounded-lg hover:cursor-pointer hover:shadow-c-3 ">
      <img
        src="../src/assets/radio2.jpg"
        alt="favicon"
        className="favicon w-10 h-10 xs-c:w-16 xs-c:h-16 rounded-full xs-c:mb-2 "
      />
      <div className="flex flex-col justify-center mx-2">
        <span className="station-name block text-slate-200 font-unbounded text-xs">
          KLUX 89.5HD - Good Company
        </span>
        <span className="state block text-lime-300 text-xs font-unbounded">
          Texas
        </span>
      </div>

      <AudioPlayer
        showJumpControls={false}
        showDownloadProgress={false}
        showFilledProgress={false}
        showSkipControls={false}
        autoPlayAfterSrcChange={false}
        customProgressBarSection={[]}
        customControlsSection={["MAIN_CONTROLS"]}
      />
    </div>
  );
}

export default RadioStationCard;
