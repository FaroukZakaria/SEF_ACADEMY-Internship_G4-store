import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { registerSchema } from "../../schema/authenticationShema";
import Input from "./Input";
import Title from "./Title";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/register/send-otp",
        values,
      );
      toast.success(data.message);
      navigate("/verify-otp", {
        state: values,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign Up Failed");
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
        mainTitle="Koda Store"
        semiTitle="Create an Account"
        lastTitle="Join us and Start Shopping"
      />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-[90%] md:w-[80%] lg:w-[30%] border-2 border-amazon-border p-7 rounded-2xl space-y-4 bg-amazon-surface mt-5"
      >
        <Input
          label="Username"
          icon={<FiUser />}
          type="text"
          placeholder="johndoe"
          {...register("username")}
        />
        <Input
          label="Email"
          icon={<FiMail />}
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        <Input
          label="Password"
          icon={<FiLock />}
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center items-center gap-2 bg-amazon-orange hover:bg-amazon-orangeHover p-3 rounded-2xl w-full text-white capitalize disabled:bg-amazon-orangeHover"
        >
          {isSubmitting ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            ""
          )}
          <p>Create Account</p>
        </button>

        <div className="flex justify-center gap-1 text-sm">
          <p className="text-amazon-textLight">Already have an account?</p>
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

export default Register;
