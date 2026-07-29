import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { forgotPasswordSchema } from "../../schema/authenticationShema";
import Title from "./Title";
import Input from "./Input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password/send-otp",
        values,
      );
      toast.success(data.message);
      navigate("/reset-password", {
        state: values,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP Expired");
    }
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:min-h-[70vh] p-10">
      <Title
        semiTitle="Forgot Password?"
        lastTitle="Enter your email to receive a reset code"
      />

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-[90%] md:w-[80%] lg:w-[30%] border-2 border-amazon-border p-7 rounded-2xl bg-amazon-surface space-y-4 mt-5"
      >
        <Input
          label="Email"
          icon={<FiMail />}
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center items-center gap-2 w-full bg-amazon-orange hover:bg-amazon-orangeHover text-white rounded-2xl py-3 capitalize disabled:opacity-70"
        >
          {isSubmitting ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            ""
          )}
          <p>Send Reset Code</p>
        </button>

        <div className="flex justify-center gap-1 text-sm">
          <p className="text-amazon-textLight">Remember your password?</p>
          <Link
            to="/login"
            className="text-amazon-orange hover:text-amazon-orangeHover font-medium"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
