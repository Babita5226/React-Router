import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { axiosInstance } from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login form data:", formData);
      const response = await axiosInstance.post("/auth/login", formData);
      const { token } = response.data;
      console.log(response);

      localStorage.setItem("token", token);
      setFormData("");
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="absolute left-1/3 w-1/3 bg-gray-200 p-10 rounded mt-10">
      <h1 className="text-center font-bold text-3xl mb-8">Login </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font-bold">UserName </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-bold">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </Form>
    </div>
  );
}

export default Login;
