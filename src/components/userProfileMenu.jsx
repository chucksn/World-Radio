import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { resetUserMenuToggle } from "../features/user/userMenuToggleSlice";
import useLogout from "../hooks/useLogout";
import useCapitalize from "../hooks/useCapitalize";
import { VscUnverified, VscVerifiedFilled } from "react-icons/vsc";
import useVerification from "../hooks/useVerification";
import profilePH from "../assets/profilePH.png";

function UserProfileMenu() {
  const user = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.isLogged);
  const isVerified = useSelector((state) => state.isVerified);
  const userMenuToggle = useSelector((state) => state.userMenuToggle);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const { logout } = useLogout();
  const { capitalizeWords } = useCapitalize();
  const dispatch = useDispatch();
  const email = user && user.email;
  const userMenuRef = useRef();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { resendVerification } = useVerification();

  const name = user && capitalizeWords(user.name);

  const handleLogout = () => {
    logout();
    setShowDeletePrompt(false);
  };

  const handleDeleteAccount = () => {
    setShowDeletePrompt(true);
  };

  const handleCancelDeletePrompt = () => {
    setShowDeletePrompt(false);
  };

  const handleProceedDeletePrompt = () => {
    const deleteUser = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/user/auth`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          logout();
          setShowDeletePrompt(false);
        }
        if (data.error) throw data.error;
      } catch (error) {
        console.error(error);
      }
    };
    deleteUser();
  };

  window.onclick = (event) => {
    if (userMenuToggle && event.target === userMenuRef.current) {
      dispatch(resetUserMenuToggle());
    }
  };

  document.onkeydown = (event) => {
    if (event.key === "Escape") {
      dispatch(resetUserMenuToggle());
    }
  };

  const handleResendVerification = () => {
    resendVerification();
    dispatch(resetUserMenuToggle());
  };

  const profileAvatar = user?.picture ? user.picture : profilePH;

  return (
    <>
      {isLogged && userMenuToggle && (
        <div
          ref={userMenuRef}
          className="user-menu-layer fixed top-0 left-0 w-full h-full z-50"
        >
          <div className="user-menu-content min-h-72 min-w-[16rem] text-black/80 bg-slate-300 border border-gray-300 rounded-lg absolute top-16 right-4 sm:top-20 sm:right-5 flex flex-col py-4 px-6 justify-between">
            <div className="user-profile p-2 flex flex-col justify-center items-center">
              <div className="user-avatar w-12 h-12 my-4 ">
                {isVerified && (
                  <img
                    src={profileAvatar}
                    alt="avatar"
                    className="rounded-full"
                  />
                )}
                {!isVerified && (
                  <img src={profilePH} alt="avatar" className="rounded-full" />
                )}
              </div>
              <span className="name block font-semibold font-roboto">
                {name}{" "}
                {!isVerified && (
                  <VscUnverified className="inline-block text-red-500 text-xl" />
                )}
                {isVerified && (
                  <VscVerifiedFilled className="inline-block text-sky-700 text-xl" />
                )}
              </span>
              <span className="email block font-semibold font-roboto text-xs ">
                {email}
              </span>
              {!isVerified && (
                <>
                  <span className="not-verified-txt block font-semibold font-roboto text-sm sm:text-base text-red-500">
                    Not Verified
                  </span>
                  <button
                    onClick={handleResendVerification}
                    className="resend-verification text-slate-200 bg-sky-900 m-4 px-3 py-2 text-xs md:text-sm rounded-lg font-roboto font-semibold shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
                  >
                    Resend Verification
                  </button>
                </>
              )}
            </div>
            <div className="logout-delete-ctn flex flex-col text-center">
              <div className="logout block border-y border-zinc-400/60 font-semibold py-2">
                <span onClick={handleLogout} className="cursor-pointer">
                  Logout
                </span>
              </div>
              <div className="logout block border-b border-zinc-400/60 text-sm font-semibold py-2">
                <span
                  onClick={handleDeleteAccount}
                  className="cursor-pointer text-red-500 font-bold"
                >
                  Delete Account
                </span>
                {showDeletePrompt && (
                  <>
                    <div className="delete-prompt mt-2">
                      <span className="block">Are you sure?</span>
                    </div>
                    <div className="delete-btn-ctn max-w-52 flex justify-around mt-2">
                      <button
                        onClick={handleProceedDeletePrompt}
                        className="bg-red-500 text-white py-1 px-3 mx-2 rounded-md"
                      >
                        Proceed
                      </button>
                      <button
                        className="bg-sky-600 text-white py-1 px-3 mx-2 rounded-md"
                        onClick={handleCancelDeletePrompt}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfileMenu;
