import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../components/login";
import SignUp from "../components/sign-up";

function SignIn() {
  const showLogin = useSelector((state) => state.showLogin);
  const showSignUp = useSelector((state) => state.showSignUp);
  const [loading, setLoading] = useState(false);

  return (
    <div className="sign-in w-full min-h-screen flex justify-center items-center">
      {showLogin && <Login setLoading={setLoading} loading={loading} />}
      {showSignUp && <SignUp setLoading={setLoading} loading={loading} />}
    </div>
  );
}

export default SignIn;
