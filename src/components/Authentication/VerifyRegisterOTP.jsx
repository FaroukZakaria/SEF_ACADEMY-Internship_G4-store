import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import Title from "./Title";
import OTPInput from "./OTPInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const VerifyRegisterOTP = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/register");
    }
  }, [navigate, state]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async (verifyOtp = otp.join("")) => {
    if (verifyOtp.length !== 6) {
      return toast.error("Please enter the 6-digit code");
    }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/register/verify-otp", {
        email: state.email,
        otp: verifyOtp,
      });
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verify Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axiosInstance.post("/auth/register/send-otp", {
        username: state.username,
        email: state.email,
        password: state.password,
      });
      toast.success("OTP sent successfully");
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:min-h-[70vh] p-10">
      <Title
        semiTitle="Verify Your Email"
        lastTitle={
          <>
            We sent a 6-digit code to
            <h1 className="text-amazon-textDark/50 font-medium">
              {state?.email}
            </h1>
          </>
        }
      />
      <div className="w-[90%] md:w-[80%] lg:w-[30%] border-2 border-amazon-border bg-amazon-surface rounded-2xl p-8 mt-5 space-y-5">
        <OTPInput value={otp} onChange={setOtp} onComplete={handleVerify} />

        <button
          type="button"
          onClick={() => handleVerify()}
          disabled={loading}
          className="flex justify-center items-center gap-2 w-full bg-amazon-orange hover:bg-amazon-orangeHover text-white rounded-2xl py-3 disabled:bg-amazon-orangeHover"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            ""
          )}
          <p>Verify & Create Account</p>
        </button>

        <div className="flex justify-center md:gap-1 text-sm">
          <p className="text-amazon-textLight">Didn't receive the code?</p>
          {timeLeft > 0 ? (
            <p className="text-amazon-textLight/50">Resend {timeLeft}s</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-amazon-orange hover:text-amazon-orangeHover font-semibold"
            >
              Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default VerifyRegisterOTP;