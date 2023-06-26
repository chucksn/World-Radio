import { useSelector } from "react-redux";
import useLogout from "./useLogout";

const useVerification = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();

  const resendVerification = async () => {
    const email = user && user.email;
    const userId = user && user.id;
    try {
      const response = await fetch(`${baseURL}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId }),
      });
      const data = await response.json();
      if (response.status === 200) {
        logout();
      }
      if (response.status === 400) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  return { resendVerification };
};

export default useVerification;
