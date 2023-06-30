import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetShowSignUp } from "../features/sign-in/showSignUpSlice";
import { setShowLogin } from "../features/sign-in/showLoginSlice";
import { setLoggedIn } from "../features/user/loggedSlice";
import { setUser } from "../features/user/userSlice";
import { setIsVerified } from "../features/user/verificationSlice";
import { resetVerificationSent } from "../features/user/sendVerificationSlice";
import useFavorites from "./useFavorites";

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getFavorites } = useFavorites();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const login = async (
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
          localStorage.setItem("user", JSON.stringify(data));
          dispatch(setLoggedIn());
          dispatch(setUser(data));
          dispatch(setIsVerified());
          getFavorites(data.token);
          navigate(-1);
          setLoading(false);
        } else {
          dispatch(setLoggedIn());
          dispatch(setUser(data));
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

  return { login, signUp };
};

export default useSignIn;
