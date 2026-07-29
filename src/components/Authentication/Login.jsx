import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import Input from "./Input";
import Title from "./Title";
import { loginSchema } from "../../schema/authenticationShema";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", values);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
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
        semiTitle="Welcome Back"
        lastTitle="Sign in to your account"
      />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-[90%] md:w-[80%] lg:w-[30%] border-2 border-amazon-border p-7 rounded-2xl space-y-4 bg-amazon-surface mt-5"
      >
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

        <div className="text-right text-amazon-orange hover:text-amazon-orangeHover text-sm font-medium">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

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
          <p>Sign In</p>
        </button>

        <div className="flex justify-center gap-1 text-sm">
          <p className="text-amazon-textLight">Don't have an account?</p>
          <Link
            to="/register"
            className="text-amazon-orange hover:text-amazon-orangeHover font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
