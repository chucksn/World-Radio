import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetShowSignUp } from "../features/sign-in/showSignUpSlice";
import { setShowLogin } from "../features/sign-in/showLoginSlice";
import { resetVerificationSent } from "../features/user/sendVerificationSlice";
import useLogin from "./useLogin";

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unVerifiedLogin, verifiedLogin } = useLogin();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const loginByEmail = async (
    email,
    password,
    setLoading,
    setEmailErrorMsg,
    setPasswordErrorMsg,
    setErrorMsg
  ) => {
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
        dispatch(resetVerificationSent());

        if (data.verified) {
          verifiedLogin(data);
          navigate(-1);
          setLoading(false);
        } else {
          unVerifiedLogin(data);
          navigate(-1);
        }
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

  const signUp = async (
    email,
    password,
    name,
    setEmailErrorMsg,
    setNameErrorMsg,
    setPasswordErrorMsg,
    setLoading
  ) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/user/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setShowLogin());
        dispatch(resetShowSignUp());
        setLoading(false);
        console.log(data.message);
      }
      if (data.error) {
        setLoading(false);
        data.error.email
          ? setEmailErrorMsg(data.error.email)
          : setEmailErrorMsg("");
        data.error.name
          ? setNameErrorMsg(data.error.name)
          : setNameErrorMsg("");
        data.error.password
          ? setPasswordErrorMsg(data.error.password)
          : setPasswordErrorMsg("");
        throw data.error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = async (setLoading) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/oauth/google/url`);
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        const authorizeURL = data.authorizeUrl;
        window.location.href = authorizeURL;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { loginByEmail, signUp, googleLogin };
};

export default useSignIn;
