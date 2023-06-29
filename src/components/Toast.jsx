import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

function Toast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const isVerificationSent = useSelector((state) => state.isVerificationSent);

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
  }, [isLogged, isVerificationSent]);
  return (
    <>
      {isLogged && !isVerificationSent && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-green-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged In{" "}
          <BsCheckCircleFill className="inline-block text-green-700" />
        </div>
      )}

      {!isLogged && !isVerificationSent && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-red-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged Out <AiOutlineLogout className="inline-block text-red-500" />
        </div>
      )}

      {isVerificationSent && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-green-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Verification Sent{" "}
          <span className="text-sm text-blue-800">Check Email</span>{" "}
          <BsCheckCircleFill className="inline-block text-green-700" />
        </div>
      )}
    </>
  );
}

export default Toast;
