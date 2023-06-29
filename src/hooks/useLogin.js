import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSignUp } from "../features/sign-in/showSignUpSlice";
import { resetShowLogin } from "../features/sign-in/showLoginSlice";
import { setLoggedIn } from "../features/user/loggedSlice";
import { setUser } from "../features/user/userSlice";
import { setIsVerified } from "../features/user/verificationSlice";
import { resetVerificationSent } from "../features/user/sendVerificationSlice";
import useFavorites from "./useFavorites";

const useLogin = () => {
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

  return { login };
};

export default useLogin;
