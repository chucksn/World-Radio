import { useDispatch } from "react-redux";
import { resetFavorites } from "../features/favorite/favoritesSlice";
import { setLoggedOut } from "../features/user/loggedSlice";
import { resetUser } from "../features/user/userSlice";
import { resetUserMenuToggle } from "../features/user/userMenuToggleSlice";
import { resetIsVerified } from "../features/user/verificationSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(resetFavorites());
    dispatch(resetUser());
    dispatch(setLoggedOut());
    dispatch(resetUserMenuToggle());
    dispatch(resetIsVerified());
  };
  return { logout };
};

export default useLogout;
