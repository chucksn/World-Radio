import { useState } from "react";
import { useSelector } from "react-redux";
import loadingSvg from "../assets/loading2.svg";
import Login from "../components/login";
import SignUp from "../components/sign-up";

function SignIn() {
  const showLogin = useSelector((state) => state.showLogin);
  const showSignUp = useSelector((state) => state.showSignUp);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center items-center relative">
      {showLogin && <Login setLoading={setLoading} loading={loading} />}
      {showSignUp && <SignUp setLoading={setLoading} loading={loading} />}
      {loading && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 ">
          <img
            src={loadingSvg}
            alt="loading"
            className="animate-spin-slow "
            width={40}
            height={40}
          />
        </div>
      )}
    </div>
  );
}

export default SignIn;
