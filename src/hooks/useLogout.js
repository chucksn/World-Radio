import { useDispatch } from "react-redux";
import { resetFavorites } from "../features/favoritesSlice";
import { setLoggedOut } from "../features/loggedSlice";
import { resetUser } from "../features/userSlice";
import { resetStation } from "../features/stationSlice";
import { resetUserMenuToggle } from "../features/userMenuToggleSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(resetFavorites());
    dispatch(resetStation());
    dispatch(resetUser());
    dispatch(setLoggedOut());
    dispatch(resetUserMenuToggle());
  };
  return { logout };
};

export default useLogout;
