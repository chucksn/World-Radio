import { RiErrorWarningFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSignUp } from "../redux/features/showSignUpSlice";
import { resetShowLogin } from "../redux/features/showLoginSlice";
import { setLoggedIn } from "../redux/features/loggedSlice";
import { setUser } from "../redux/features/userSlice";
import useFavorites from "../hooks/useFavorites";

function Login({ loading, setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { getFavorites } = useFavorites();

  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    navigate("/");
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
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
        <span onClick={handleSignUp} className="text-sky-600 cursor-pointer">
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
          className={`p-2 rounded-lg mb-4 ${
            errorMsg && errorMsg === "Email required"
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className={`p-2 rounded-lg mb-4 ${
            errorMsg && errorMsg === "Password required"
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg my-4 outline-none"
        >
          Login
        </button>
      </form>
      {errorMsg && (
        <span className="block text-red-500">
          <RiErrorWarningFill className="inline text-xl" /> {errorMsg}
        </span>
      )}
    </div>
  );
}

export default Login;
