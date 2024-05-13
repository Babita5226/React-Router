import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { axiosInstance } from "./AxiosInstance";
import { useAuthentication } from "./AuthContext";

const ProtectedRoutes = () => {
  const { isLoggedIn, login } = useAuthentication();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        await axiosInstance.get("/auth/me");
        login();
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoading(false);
        setError(error.response.data.message);
      }
    };

    checkLoggedIn();
  }, [login]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 text-center mt-40 text-4xl">
        Error: {error}
      </div>
    );
  }

  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;
