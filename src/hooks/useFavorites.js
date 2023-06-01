import { useDispatch } from "react-redux";
import { setFavorites } from "../redux/features/favoritesSlice";

const useFavorites = () => {
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const getFavorites = async (token) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) dispatch(setFavorites(data.favorites));
      if (data.error) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  return { getFavorites };
};

export default useFavorites;
