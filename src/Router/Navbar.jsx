import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "./AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Router</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="">
              <Link to="/home"> Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about"> About</Link>
            </Nav.Link>
            {isLoggedIn ? (
              <Nav>
                <Nav.Link>
                  <button onClick={handleLogout}>Logout</button>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
