import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const newUser = {
            email: data.email,
            name: data.name,
            role: "unsubscribed",
          };
          axiosPublic.post("/users", newUser).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Registration Completed",
                showClass: {
                  popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
                },
                hideClass: {
                  popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
                },
              });
              reset();
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="flex justify-center items-center max-h-screen bg-base-200">
      <div className="w-full max-w-md py-10 px-12 mt-20 rounded-lg my-10 border border-lime-600">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-center handwritten">REGISTER</h1>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-6">
              <input
                type="text"
                name="photoURL"
                placeholder="Image Link *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                {...register("photoURL", {
                  required: "photoURL is required",
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                placeholder="User Name *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                {...register("name", {
                  required: "Name is required",
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="">
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email ID *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className="w-full border border-gray-600 rounded-md px-4 py-2"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Minimum 6 character required</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500">Maximum 20 character required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-800">
                  {" "}
                  *At least one uppercase letter, one lowercase letter, one
                  number and one special character required.*
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <h2 className="text-md mt-3 font-semibold handwritten">
          Already have an account? Please{" "}
          <Link className="text-green-500 underline" to="/login">
            Log in
          </Link>{" "}
        </h2>
        
      </div>
    </div>
  );
};

export default Register;
