import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaFolderPlus } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
  const role = "subscribed";
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row bg-base-300 min-h-screen">
      {/* Hamburger menu for small and medium devices */}
      <div className="flex md:hidden justify-between items-center p-4">
        
        <button onClick={toggleSidebar} className="text-xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-2/3 sm:w-1/3 h-screen bg-green-300 font-semibold z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-1/5`}
      >
        <ul className="menu p-4 text-lg">
          <li className="md:hidden">
            <button onClick={toggleSidebar} className="text-lg">
              &times; Close
            </button>
          </li>
          {/* User routes */}
          {(role === "subscribed" || role === "unsubscribed") && (
            <>
              <li>
                <NavLink to="/dashboard/userProfile" onClick={toggleSidebar}>
                  <FaUser />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProduct" onClick={toggleSidebar}>
                  <FaFolderPlus />
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProduct" onClick={toggleSidebar}>
                  <FaBoxOpen />
                  My Product
                </NavLink>
              </li>
            </>
          )}

          {/* Admin routes */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/statistics" onClick={toggleSidebar}>
                  <IoStatsChart />
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers" onClick={toggleSidebar}>
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons" onClick={toggleSidebar}>
                  <RiCoupon3Line />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* Common Routes */}
          <div className="divider"></div>
          <li>
            <NavLink to="/" onClick={toggleSidebar}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={toggleSidebar}>
              <FiMenu />
              All Products
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogOut();
                toggleSidebar();
              }}
            >
              <FaSignOutAlt />
              LogOut
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-5 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
