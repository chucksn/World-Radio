import { useParams } from "react-router-dom";
import { useVerifyQuery } from "../features/api/verifyApiSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import useLogin from "../hooks/useLogin";
import { FiCheckCircle } from "react-icons/fi";

function VerifyConfirmationPg() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifiedLogin } = useLogin();
  const { isError, isLoading, data, error } = useVerifyQuery(token);

  if (data) {
    verifiedLogin(data);
  }

  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="verify-confirm-page w-full h-screen flex justify-center items-center">
      <div className="verify-confirm-main bg-slate-300 w-[80%] md:w-[50%] h-[50%] rounded-md relative">
        {isError && (
          <div className="content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
            <span className="block sm:text-lg text-red-500 font-semibold">
              {error.data.error}
            </span>

            <span className="block text-sm sm:text-base text-blue-600 font-medium mt-2">
              Login and re-send verification
            </span>

            <button
              onClick={handleClose}
              className="favorite-country-toggle text-slate-200 bg-sky-900 mt-6 px-3 py-2 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {data && (
          <div className="content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
            <FiCheckCircle className="inline-block text-6xl text-green-600" />

            <span className="block sm:text-lg text-blue-600 font-medium mt-4">
              {data.message}
            </span>

            <button
              onClick={handleClose}
              className="favorite-country-toggle text-slate-200 bg-sky-900 mt-6 px-3 py-2 text-xs md:text-sm rounded-lg font-unbounded shadow-md lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {isLoading && <Loading key="loading" size={50} />}
      </div>
    </div>
  );
}

export default VerifyConfirmationPg;
