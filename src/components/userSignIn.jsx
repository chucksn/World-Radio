import { useSelector } from "react-redux";

function UserSignIn() {
  const isLogged = useSelector((state) => state.isLogged);

  const handleLogin = () => {};
  const handleSignUp = () => {};

  return (
    <div className="sign-in flex">
      {!isLogged && (
        <>
          <button
            onClick={handleSignUp}
            className="bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] mr-2 outline-none"
          >
            Sign up
          </button>
          <button
            onClick={handleLogin}
            className="bg-slate-700 hover:bg-slate-600 lg:text-[1.05rem] text-white px-2 py-[2px] font-medium rounded-[6px] ml-2 outline-none"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default UserSignIn;
