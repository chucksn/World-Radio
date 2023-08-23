import { useDispatch } from "react-redux";
import { setLoggedIn } from "../features/user/loggedSlice";
import { setUser } from "../features/user/userSlice";
import { setIsVerified } from "../features/user/verificationSlice";
import useFavorites from "./useFavorites";

const useLogin = () => {
  const dispatch = useDispatch();
  const { getFavorites } = useFavorites();

  const verifiedLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(setLoggedIn());
    dispatch(setUser(data));
    dispatch(setIsVerified());
    getFavorites(data.token);
  };

  const unVerifiedLogin = (data) => {
    dispatch(setLoggedIn());
    dispatch(setUser(data));
  };

  return { verifiedLogin, unVerifiedLogin };
};

export default useLogin;
