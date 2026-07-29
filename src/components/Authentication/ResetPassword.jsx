import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { resetPasswordSchema } from "../../schema/authenticationShema";
import Title from "./Title";
import Input from "./Input";
import OTPInput from "./OTPInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!state) {
      navigate("/forgot-password");
    }
  }, [navigate, state]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async (otpCode = otp.join("")) => {
    if (otpCode.length !== 6) {
      return toast.error("Please enter the 6-digit code");
    }
    const password = getValues("newPassword");
    if (!password) {
      return toast.error("Please enter your new password");
    }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "/auth/forgot-password/verify-otp",
        {
          email: state.email,
          otp: otpCode,
          newPassword: password,
        },
      );
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset Password Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axiosInstance.post("/auth/forgot-password/send-otp", {
        email: state.email,
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
        semiTitle="Reset Password"
        lastTitle={
          <>
            Enter the code sent to
            <h1 className="text-amazon-textDark/60 font-medium">
              {state?.email}
            </h1>
          </>
        }
      />
      <form
        onSubmit={handleSubmit(() => handleVerify())}
        className="w-[90%] md:w-[80%] lg:w-[30%] border-2 border-amazon-border bg-amazon-surface rounded-2xl p-8 mt-5 space-y-5"
      >
        <OTPInput value={otp} onChange={setOtp} onComplete={handleVerify} />

        <Input
          label="New Password"
          icon={<FiLock />}
          type="password"
          placeholder="New Password"
          {...register("newPassword")}
        />

        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="flex justify-center items-center gap-2 w-full bg-amazon-orange hover:bg-amazon-orangeHover text-white rounded-2xl py-3 disabled:bg-amazon-orangeHover"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            ""
          )}
          <p>Reset Password</p>
        </button>

        <div className="flex justify-center gap-1 text-sm">
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
      </form>
    </div>
  );
};

export default ResetPassword;
