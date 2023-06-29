import { useParams } from "react-router-dom";

function VerifyConfirmationPg() {
  const { token } = useParams();

  return (
    <div className="verify-confirm-page w-full h-screen flex justify-center items-center">
      <div className="verify-confirm-main bg-slate-300 w-[80%] h-[60%] rounded-md"></div>
    </div>
  );
}

export default VerifyConfirmationPg;
