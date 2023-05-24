import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetShowLogin } from "../redux/features/showLoginSlice";
import { setShowSignUp } from "../redux/features/showSignUpSlice";

function UserSignIn() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const handleLogin = () => {};
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
            className="bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] mr-2 outline-none"
          >
            Sign up
          </Link>
          <Link
            to="/sign-in"
            onClick={handleLogin}
            className="bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] ml-2 outline-none"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default UserSignIn;
