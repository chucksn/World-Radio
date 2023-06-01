import { useDispatch } from "react-redux";
import { resetFavorites } from "../redux/features/favoritesSlice";
import { resetPlayerData } from "../redux/features/playerDataSlice";
import { setLoggedOut } from "../redux/features/loggedSlice";
import { resetUser } from "../redux/features/userSlice";
import { resetStation } from "../redux/features/stationSlice";
import { resetUserMenuToggle } from "../redux/features/userMenuToggleSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(resetFavorites());
    dispatch(resetPlayerData());
    dispatch(resetStation());
    dispatch(resetUser());
    dispatch(setLoggedOut());
    dispatch(resetUserMenuToggle());
  };
  return { logout };
};

export default useLogout;
