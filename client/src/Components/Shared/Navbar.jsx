import { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-black bg-opacity-35 w-full p-4 fixed">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Brand Name */}
        <div className="text-white text-2xl">Lunch Time</div>

        {/* Links - Hidden on small screens and visible on medium and larger screens */}
        <div className="hidden md:flex md:items-center md:space-x-6 text-md">
          <NavLink to="/">
            <button className="text-white">Home</button>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">
                <button className="text-white">Dashboard</button>
              </NavLink>
              <button
              className="text-white"
                onClick={() => {
                  handleLogOut();
                }}
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="text-white">Login</button>
              </NavLink>
              <NavLink to="/register">
                <button className="text-white">Register</button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button - Visible on small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Conditionally rendered based on isOpen state */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 right-0 bg-black bg-opacity-35 w-28 p-4 md:hidden`}
      >
        <div className="flex flex-col">
          <NavLink to="/">
            <button className="text-white">Home</button>
          </NavLink>
          <NavLink to="/login">
            <button className="text-white">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="text-white">Register</button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
