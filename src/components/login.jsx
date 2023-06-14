import { MdErrorOutline } from "react-icons/md";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSignUp } from "../features/sign-in/showSignUpSlice";
import { resetShowLogin } from "../features/sign-in/showLoginSlice";
import { setLoggedIn } from "../features/user/loggedSlice";
import { setUser } from "../features/user/userSlice";
import useFavorites from "../hooks/useFavorites";

function Login({ loading, setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { getFavorites } = useFavorites();

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    navigate(-1);
  };
  const handleSignUp = () => {
    dispatch(resetShowLogin());
    dispatch(setShowSignUp());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch(`${baseURL}/api/v1/user/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setLoggedIn());
        dispatch(setUser(data));
        getFavorites(data.token);
        navigate(-1);
        setLoading(false);
      }
      if (data.error) {
        setLoading(false);
        data.error.email
          ? setEmailErrorMsg(data.error.email)
          : setEmailErrorMsg("");
        data.error.password
          ? setPasswordErrorMsg(data.error.password)
          : setPasswordErrorMsg("");

        data.error && data.error === "Invalid email or password"
          ? setErrorMsg(data.error)
          : setErrorMsg("");
        throw data.error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login flex flex-col justify-between items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative">
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
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg my-4 outline-none"
        >
          Login
        </button>
      </form>
      {errorMsg && errorMsg === "Invalid email or password" && (
        <span className="block text-red-500 text-center font-medium text-sm">
          <MdErrorOutline className="inline text-xl  " /> {errorMsg}
        </span>
      )}
    </div>
  );
}

export default Login;
