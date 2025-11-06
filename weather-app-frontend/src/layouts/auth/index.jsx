import React from "react";
import { useAuth } from "../../context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isLoggedIn } = useAuth();

  console.log({ isLoggedIn });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default AuthLayout;
