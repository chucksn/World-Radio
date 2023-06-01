import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfileMenu from "../components/userProfileMenu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/features/loggedSlice";
import { setUser } from "../redux/features/userSlice";
import useFavorites from "../hooks/useFavorites";

function Root() {
  const dispatch = useDispatch();
  const { getFavorites } = useFavorites();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setLoggedIn());
      dispatch(setUser(user));
      getFavorites(user.token);
    }
  }, []);
  return (
    <div className="shared-layout w-full min-h-screen bg-gradient-to-r from-slate-600 to-gray-900 pt-11 pb-72 relative">
      <Header />
      <Outlet />
      <Footer />
      <UserProfileMenu />
    </div>
  );
}

export default Root;
