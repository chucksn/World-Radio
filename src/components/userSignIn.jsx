import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetShowLogin } from "../redux/features/showLoginSlice";
import { setShowSignUp } from "../redux/features/showSignUpSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { setUserMenuToggle } from "../redux/features/userMenuToggleSlice";

function UserSignIn() {
  const isLogged = useSelector((state) => state.isLogged);
  const user = useSelector((state) => state.user);
  const userMenuToggle = useSelector((state) => state.userMenuToggle);
  const dispatch = useDispatch();

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleUserMenuBtn = () => {
    dispatch(setUserMenuToggle());
  };
  const handleSignUp = () => {
    dispatch(resetShowLogin());
    dispatch(setShowSignUp());
  };

  return (
    <div className="sign-in flex">
      {!isLogged && (
        <>
          <Link
            to="/sign-in"
            onClick={handleSignUp}
            className="sign-up-btn bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] mr-2 outline-none"
          >
            Sign up
          </Link>
          <Link
            to="/sign-in"
            className="login-btn bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] ml-2 outline-none"
          >
            Login
          </Link>
        </>
      )}
      {isLogged && user && (
        <button
          onClick={handleUserMenuBtn}
          className="user-menu-btn bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-3 py-[2px] font-medium rounded-[6px] ml-2 outline-none"
        >
          {capitalizeWords(user.name)}{" "}
          {!userMenuToggle && <AiFillCaretDown className="inline-block" />}
          {userMenuToggle && <AiFillCaretUp className="inline-block" />}
        </button>
      )}
    </div>
  );
}

export default UserSignIn;