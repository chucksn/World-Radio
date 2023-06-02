import { useDispatch } from "react-redux";
import { setFavorites } from "../redux/features/favoritesSlice";
import useLogout from "./useLogout";

const useFavorites = () => {
  const dispatch = useDispatch();
  const { logout } = useLogout();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const getFavorites = async (token) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.status === 200) dispatch(setFavorites(data.favorites));
      if (response.status === 401) logout();
      if (data.error) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  return { getFavorites };
};

export default useFavorites;
