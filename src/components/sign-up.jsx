import { RiErrorWarningFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { resetShowSignUp } from "../redux/features/showSignUpSlice";
import { setShowLogin } from "../redux/features/showLoginSlice";

function SignUp({ loading, setLoading }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const email = emailRef.current && emailRef.current.value;
  const password = passwordRef.current && passwordRef.current.value;
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleClose = () => {
    dispatch(setShowLogin());
    dispatch(resetShowSignUp());
  };
  const handleCreateAccount = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sign-up flex flex-col justify-center items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-20 sm:mt-32 mb-8">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>

      <span className="block font-medium text-lg text-black/70">
        Create a user account
      </span>
      <span className="block my-4">
        Already have an account?{" "}
        <span onClick={handleClose} className="text-sky-600 cursor-pointer">
          Login
        </span>
      </span>
      <form className="flex flex-col " onSubmit={handleCreateAccount}>
        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="Enter Email"
          spellCheck={false}
          className={`p-2 rounded-lg mb-4 ${
            emailErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="name"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {emailErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {emailErrorMsg}
            </>
          )}
        </label>

        <label htmlFor="password" className="mt-3">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className={`p-2 rounded-lg mb-4 ${
            passwordErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="password"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {passwordErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {passwordErrorMsg}
            </>
          )}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg mt-8 mb-4 outline-none"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
