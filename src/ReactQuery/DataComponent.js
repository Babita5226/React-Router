import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DataComponent = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
