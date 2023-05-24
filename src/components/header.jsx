import CountrySelector from "./countrySelector";
import logoSvg from "../assets/world-radio-logo2.svg";
import UserSignIn from "./userSignIn";
import { BsSearch } from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";
import { useState } from "react";

function Header({ onAboutClick, aboutToggle }) {
  const [showSmScreenSearch, setShowSmScreenSearch] = useState(false);

  const handleSmScreenSearchClick = () => {
    setShowSmScreenSearch(!showSmScreenSearch);
  };
  return (
    <div className="header-main fixed top-0 left-0 w-full z-50 flex flex-col px-3 py-[14px] sm:px-8 sm:py-4 bg-gradient-to-r from-slate-600 to-gray-900 shadow">
      <div className="header-upper flex items-center justify-between   ">
        <img
          src={logoSvg}
          alt="logo"
          className="w-32 md:w-40 lg:w-48 bg-slate-300 rounded-xl p-[1px] shadow-c-cyan"
        />

        {/* <span
        className="about font-unbounded text-teal-500 block pb-4 text-sm cursor-pointer"
        onClick={onAboutClick}
      >
        ABOUT APP{" "}
        {!aboutToggle && <i className="fa-solid fa-circle-chevron-down"></i>}
        {aboutToggle && <i className="fa-solid fa-circle-chevron-up "></i>}
      </span> */}
        <div className="hidden sm:block sm:w-[40%] ">
          <CountrySelector />
        </div>
        <div
          className="sm-screen-search sm:hidden hover:cursor-pointer mx-2"
          onClick={handleSmScreenSearchClick}
        >
          {!showSmScreenSearch && (
            <BsSearch className="text-slate-200 text-xl block " />
          )}
          {showSmScreenSearch && (
            <MdOutlineSearchOff className="text-slate-200 text-3xl block " />
          )}
        </div>
        <UserSignIn />
      </div>
      {showSmScreenSearch && (
        <div className="sm:hidden w-full mt-2">
          <CountrySelector />
        </div>
      )}
    </div>
  );
}

export default Header;
