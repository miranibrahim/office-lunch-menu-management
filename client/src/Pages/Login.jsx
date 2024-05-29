import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import "./home.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    try {
      const result = await signIn(email, password);
      if (result.user) {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!!",
          showConfirmButton: false,
          timer: 1500,
        });
        // toast.success("Successfully toasted!");
        e.target.reset();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex h-screen justify-center items-center bg-base-200">
        <div className="w-full max-w-md p-16 rounded-lg border border-green-600">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-center handwritten">
                LOG IN
              </h1>
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email ID *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                required
              />
            </div>

            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-4 rounded"
            >
              Log in
            </button>
          </form>
          <h2 className="text-md mt-3 font-semibold handwritten">
            New to this site? Please{" "}
            <Link className="text-green-500 underline" to="/register">
              Sign Up
            </Link>{" "}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
