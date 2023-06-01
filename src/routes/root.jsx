import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfileMenu from "../components/userProfileMenu";

function Root() {
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
