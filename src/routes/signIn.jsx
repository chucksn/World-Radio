import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/loading";
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
      {loading && <Loading key="loading" height={40} width={40} />}
    </div>
  );
}

export default SignIn;
