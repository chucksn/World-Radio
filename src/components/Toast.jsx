import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

function Toast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [isLogged]);
  return (
    <>
      {isLogged && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] border border-green-600 sm:top-32 px-3 py-1 bg-white/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged In{" "}
          <BsCheckCircleFill className="inline-block text-green-600" />
        </div>
      )}

      {!isLogged && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] border border-red-500 sm:top-32 px-3 py-1 bg-white/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged Out <AiOutlineLogout className="inline-block text-red-500" />
        </div>
      )}
    </>
  );
}

export default Toast;
