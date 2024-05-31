import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaClipboard,
  FaEdit,
  FaHistory,
  FaHome,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  axiosPublic.get(`/users/${user?.email}`).then((res) => {
    const userRole = res.data.data[0].role;
    console.log(userRole);
    if (userRole === "admin") {
      setRole(true);
    }
  });

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
          {!role && (
            <>
              <li>
                <NavLink to="/dashboard/todayMenu" onClick={toggleSidebar}>
                  <MdOutlineRestaurantMenu />
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Today's Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/previousOrders" onClick={toggleSidebar}>
                  <FaHistory />
                  Order History
                </NavLink>
              </li>
            </>
          )}

          {/* Admin routes */}
          {role && (
            <>
              <li>
                <NavLink to="/dashboard/addMenu" onClick={toggleSidebar}>
                  <MdNoteAdd />
                  Add Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMenu" onClick={toggleSidebar}>
                  <FaEdit />
                  Manage Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/orders" onClick={toggleSidebar}>
                  <FaClipboard />
                  Orders
                </NavLink>
                {/* <NavLink to="/dashboard/manageUsers" onClick={toggleSidebar}>
                  <FaUsers />
                  Manage Users
                </NavLink> */}
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
        Welcome to lunch time
        <Outlet />
        
      </div>
    </div>
  );
};

export default Dashboard;
