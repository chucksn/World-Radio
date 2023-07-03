import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { resetAddRemoveFavorite } from "../features/favorite/addRemoveFavoriteSlice";

function Toast() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const favorites = useSelector((state) => state.favorites);
  const isVerificationSent = useSelector((state) => state.isVerificationSent);
  const favoriteAddRemoveState = useSelector(
    (state) => state.favoriteAddRemoveState
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      dispatch(resetAddRemoveFavorite());
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [isLogged, isVerificationSent]);

  useEffect(() => {
    if (isMounted) {
      if (favoriteAddRemoveState) {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    }
  }, [favorites]);

  //

  return (
    <>
      {isLogged && !isVerificationSent && !favoriteAddRemoveState && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-green-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged In{" "}
          <BsCheckCircleFill className="inline-block text-green-700" />
        </div>
      )}

      {!isLogged && !isVerificationSent && !favoriteAddRemoveState && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-red-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Logged Out <AiOutlineLogout className="inline-block text-red-500" />
        </div>
      )}

      {isVerificationSent && !favoriteAddRemoveState && (
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

      {favoriteAddRemoveState === "added" && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-green-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Favorite Added{" "}
          <BsFillBookmarkPlusFill className="inline-block text-green-700" />
        </div>
      )}

      {favoriteAddRemoveState === "removed" && (
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[70px] z-[60] sm:top-32 px-4 py-1 bg-red-100/80 rounded-lg md:text-lg font-medium ${
            isVisible ? "block" : "hidden"
          }`}
        >
          Favorite Removed{" "}
          <BsFillBookmarkDashFill className="inline-block text-red-500" />
        </div>
      )}
    </>
  );
}

export default Toast;
