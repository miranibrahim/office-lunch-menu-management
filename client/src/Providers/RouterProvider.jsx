import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "../SecuredRoutes/PrivateRoute";
import PreventLogin from "../SecuredRoutes/PreventLogin";
import AddMenu from "../Pages/Dashboard/AddMenu";
import ManageMenu from "../Pages/Dashboard/ManageMenu";
import UpdateMenu from "../Pages/Dashboard/UpdateMenu";
import CurrentMenu from "../Pages/Dashboard/CurrentMenu";
import PreviousOrders from "../Pages/Dashboard/PreviousOrders";
import Orders from "../Pages/Dashboard/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/login",
        element: (
          <PreventLogin>
            <Login />
          </PreventLogin>
        ),
      },
      {
        path: "/register",
        element: (
          <PreventLogin>
            <Register />
          </PreventLogin>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/addMenu",
        element: (
          <PrivateRoute>
            <AddMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageMenu",
        element: (
          <PrivateRoute>
            <ManageMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/todayMenu",
        element: (
          <PrivateRoute>
            <CurrentMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/previousOrders",
        element: (
          <PrivateRoute>
            <PreviousOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateMenu/:date",
        element: (
          <PrivateRoute>
            <UpdateMenu />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            // `https://server-eta-lake.vercel.app/menus/${params.date}`
            `http://localhost:5000/menus/${params.date}`
          ),
      },
    ],
  },
]);
