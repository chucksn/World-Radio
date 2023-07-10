import { useSelector, useDispatch } from "react-redux";
import { setVerificationSent } from "../features/user/sendVerificationSlice";
import useLogout from "./useLogout";

const useVerification = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const resendVerification = async () => {
    const email = user && user.email;
    const userId = user && user.id;
    const auth = user && user.auth;

    try {
      const response = await fetch(`${baseURL}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId, auth }),
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(setVerificationSent());
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
