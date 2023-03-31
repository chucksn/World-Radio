import CountrySelector from "./countrySelector";

function Header({ onAboutClick, aboutToggle }) {
  return (
    <div className="header flex flex-col items-center p-6 justify-between lg:flex-row bg-slate-400/5 shadow ">
      <div className="logo-container flex items-center bg-slate-900 p-2 rounded-xl shadow-c-1 mb-6 lg:mb-0">
        <h1 className="font-medium text-2xl font-unbounded text-cyan-500  md:text-3xl lg:text-4xl">
          World Radio
        </h1>
        <i className="fa-solid fa-radio text-2xl text-amber-600 ml-2 lg:text-3xl"></i>
      </div>
      <span
        className="about font-unbounded text-teal-500 block pb-4 text-sm cursor-pointer"
        onClick={onAboutClick}
      >
        ABOUT APP{" "}
        {!aboutToggle && <i className="fa-solid fa-circle-chevron-down"></i>}
        {aboutToggle && <i className="fa-solid fa-circle-chevron-up "></i>}
      </span>
      <CountrySelector />
    </div>
  );
}

export default Header;
