import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Router</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="">
              {" "}
              <Link to="/"> Home</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/about"> About</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/contact"> Contact</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
