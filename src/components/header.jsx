import CountrySelector from "./countrySelector";
import logoSvg from "../assets/world-radio-logo2.svg";
import UserSignIn from "./userSignIn";
import { BsSearch } from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [showSmScreenSearch, setShowSmScreenSearch] = useState(false);

  const handleSmScreenSearchClick = () => {
    setShowSmScreenSearch(!showSmScreenSearch);
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="header-main fixed top-0 left-0 w-full z-50 flex flex-col px-3 pt-5 pb-3 sm:px-8 sm:pb-4 sm:pt-7 bg-gradient-to-r from-slate-600 to-gray-900 shadow">
      <div className="header-upper flex items-center justify-between   ">
        <img
          src={logoSvg}
          alt="logo"
          onClick={handleClickLogo}
          className="logo w-32 h-[19.38px] md:w-40 md:h-[23.78px] lg:w-48 lg:h-[28.2px] bg-slate-300 rounded-xl p-[1px] shadow-c-cyan cursor-pointer"
        />

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
