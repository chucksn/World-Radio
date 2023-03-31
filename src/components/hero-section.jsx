function Hero() {
  return (
    <div className="hero-section relative w-11/12 min-h-32 md:min-h-40 lg:min-h-52 mb-4 lg:mb-8 rounded-xl bg-[url('../src/assets/radio-studio.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="hero-bg-overlay absolute w-full h-full top-0 bg-black/40 rounded-xl p-4 sm:p-6 lg:p-12">
        <div className="w-1/2 lg:w-1/4">
          <span className="hero-text1 block font-unbounded text-sm lg:text-lg lg:max-w-56 text-gray-300">
            Stream Over 15,000 Radio Stations Worldwide{" "}
            <span className="text-red-500 font-semibold">Live...</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
