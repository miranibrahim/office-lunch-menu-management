import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./Providers/RouterProvider";
import AuthProvider from "./Providers/AuthProvider";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <div className="">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
