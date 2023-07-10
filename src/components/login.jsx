import { MdErrorOutline } from "react-icons/md";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSignUp } from "../features/sign-in/showSignUpSlice";
import { resetShowLogin } from "../features/sign-in/showLoginSlice";
import useSignIn from "../hooks/useSignIn";
import { FcGoogle } from "react-icons/fc";

function Login({ loading, setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginByEmail, googleLogin } = useSignIn();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    navigate(-1);
  };
  const handleSignUp = () => {
    dispatch(resetShowLogin());
    dispatch(setShowSignUp());
    window.scrollTo(0, 0, "smooth");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    loginByEmail(
      email,
      password,
      setLoading,
      setEmailErrorMsg,
      setPasswordErrorMsg,
      setErrorMsg
    );
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin(setLoading);
  };

  return (
    <div className="login flex flex-col justify-between  w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>
      <span className="block my-6">
        Don't have an account?{" "}
        <span
          onClick={handleSignUp}
          className="text-sky-600 cursor-pointer font-medium"
        >
          Sign Up
        </span>
      </span>
      <form className="flex flex-col " onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="Enter email"
          spellCheck={false}
          className={`p-2 rounded-lg ${!emailErrorMsg ? "mb-4" : ""}  ${
            emailErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        {emailErrorMsg && (
          <label className="block text-red-500 mb-4 mt-[3px] text-center font-medium text-sm">
            <MdErrorOutline className="inline text-xl" /> {emailErrorMsg}
          </label>
        )}

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className={`p-2 rounded-lg ${!passwordErrorMsg ? "mb-4" : ""}  ${
            passwordErrorMsg
              ? "outline outline-2 outline-red-500 "
              : " outline-none"
          }`}
          size={25}
        />
        {passwordErrorMsg && (
          <label className="block text-red-500 mb-4 mt-[3px] text-center font-medium text-sm">
            <MdErrorOutline className="inline text-xl " /> {passwordErrorMsg}
          </label>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base px-6 py-2 rounded-lg my-4 outline-none"
        >
          Login with Email
        </button>
      </form>

      {errorMsg && errorMsg === "Invalid email or password" && (
        <span className="block text-red-500 text-center font-medium text-sm">
          <MdErrorOutline className="inline text-xl  " /> {errorMsg}
        </span>
      )}

      <div className="relative my-3">
        <hr className="absolute w-[42%] border-neutral-400 top-1/2 left-0" />
        <span className="block text-center text-neutral-600 text-sm sm:text-base font-medium">
          OR
        </span>
        <hr className="absolute w-[42%] border-neutral-400 top-1/2 right-0" />
      </div>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="border border-sky-600 bg-slate-100 font-medium text-sm sm:text-base text-neutral-700 hover:bg-white px-4 py-1 sm:px-6 rounded-lg my-4 outline-none"
      >
        <FcGoogle className="inline-block text-3xl" />
        &nbsp; Continue with Google
      </button>
    </div>
  );
}

export default Login;
