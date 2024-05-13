import React, { useEffect, useState } from "react";
import { axiosInstance } from "./AxiosInstance";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData && (
        <div className="ml-96 mt-20">
          <h1 className="text-3xl">Welcome to React-Router!</h1>
          <h2 className="text-lg text-blue-500">User Details:</h2>
          <p className="text-lg">
            <span className="font-bold"> Username: </span>
            {userData.username}
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
