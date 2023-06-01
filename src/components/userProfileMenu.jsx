import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { resetUserMenuToggle } from "../redux/features/userMenuToggleSlice";

function UserProfileMenu() {
  const user = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.isLogged);
  const userMenuToggle = useSelector((state) => state.userMenuToggle);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const dispatch = useDispatch();
  const name = user && user.name;
  const email = user && user.email;
  const userMenuRef = useRef();

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizedName = user && capitalizeWords(name);

  const handleLogout = () => {};

  const handleDeleteAccount = () => {};

  const handleCancelDeletePrompt = () => {};

  const handleProceedDeletePrompt = async () => {};

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

  return (
    <>
      {isLogged && userMenuToggle && (
        <div
          ref={userMenuRef}
          className="user-menu-layer absolute top-0 left-0 w-full h-full z-50"
        >
          <div className="user-menu-content min-h-72 min-w-60 text-black/80 bg-slate-300 border border-gray-300 rounded-lg absolute top-16 right-4 sm:top-20 sm:right-5 flex flex-col py-4 px-6 justify-between">
            <div className="user-profile p-2 flex flex-col justify-center items-center">
              <div className="user-avatar text-white font-semibold text-xl bg-green-600 w-12 h-12 my-4 flex justify-center items-center rounded-full">
                {name.charAt(0).toUpperCase()}
              </div>
              <span className="name block font-semibold font-roboto">
                {capitalizedName}
              </span>
              <span className="email block font-semibold font-roboto text-xs ">
                {email}
              </span>
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
                  className="cursor-pointer text-red-500"
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
                        className="bg-red-500 text-white py-1 px-3 rounded-md"
                      >
                        Proceed
                      </button>
                      <button
                        className="bg-sky-600 text-white py-1 px-3 rounded-md"
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
