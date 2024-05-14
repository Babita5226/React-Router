import React, { useEffect, useState } from "react";
import { axiosInstance } from "./AxiosInstance";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 5;

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setData(response.data.products);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="bg-gray-600 h-20 -mt-4 ">
        <h1 className="w-full text-center mb-8 text-3xl font-bold mt-16 pt-4 text-white">
          All Products
        </h1>
      </div>
      <div className="flex flex-wrap justify-center bg-gray-100  ">
        {currentItems.map((product, index) => (
          <div key={index} className="w-1/3 p-4">
            <div className="h-full">
              <Card className="flex flex-col h-full shadow border-none ">
                <div className="h-60 overflow-hidden w-72 ml-20 mt-10 transition-transform duration-300 transform hover:scale-105 ">
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    className="object-fill h-full   "
                  />
                </div>
                <Card.Body className="flex flex-col justify-between">
                  <div>
                    <Card.Title className="text-blue-800 hover:text-red-600">
                      {product.title}
                    </Card.Title>
                    <Card.Text className="text-gray-600">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="text-gray-600">
                      Brand: {product.brand}
                    </Card.Text>
                    <Card.Text className="text-gray-600">
                      Category: {product.category}
                    </Card.Text>
                    <Card.Text className="text-gray-600">
                      Price:{" "}
                      <span className="font-bold text-black">
                        ${product.price}
                      </span>
                    </Card.Text>
                    <i className="fa-solid fa-star text-orange-400 "></i>
                    <span>{product.rating}</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center mb-10">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <ul className="flex">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`mx-1 px-3 py-1 cursor-pointer ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        </ul>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
