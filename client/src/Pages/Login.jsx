import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import "./home.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        Swal.fire("Log in successful", "Press ok to Continue", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };
  return (
    <>
      {/* <Navbar /> */}
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

            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                required
              />
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
