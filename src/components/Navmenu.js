import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../api/ContextApi";

export default function Navmenu() {
  const { cartCount, user, signOutUser } = useAppState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <>
      <Navbar fixed="top" bg="secondary" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              width={80}
              alt="amazon-logo"
            />
          </Navbar.Brand>
          <Form className="mx-2 w-50">
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="search"
                  className="rounded-0 border-none shadow-none"
                />
                <button className="btn btn-warning rounded-0 border-none shadow-none">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
              </InputGroup>
            </Form.Group>
          </Form>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-none shadow-none"
          >
            <div className="toggler-icon bar-1"></div>
            <div className="toggler-icon bar-2"></div>
            <div className="toggler-icon bar-3"></div>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <Button className="btn-secondary" onClick={handleLogout}>
                  Hi,{" "}
                  {user.displayName === null ? "Username" : user.displayName}
                  <p className="mb-0 text-start" style={{ fontSize: "12px" }}>
                    Log out
                  </p>
                </Button>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="bg-secondary mx-2 text-white"
                >
                  <p className="mb-0" style={{ fontSize: "12px" }}>
                    Hello, Sign in
                  </p>
                  <p className="mb-0 text-start">Login</p>
                </Nav.Link>
              )}
              <Nav.Link
                as={Link}
                to="/orders"
                className="bg-secondary mx-2 text-white"
              >
                <p className="mb-0 text-start" style={{ fontSize: "12px" }}>
                  Returns
                </p>
                <p className="mb-0 text-start">& Orders</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="text-white">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                &nbsp;{cartCount}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
