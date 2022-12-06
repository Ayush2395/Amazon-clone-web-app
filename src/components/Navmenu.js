import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navmenu = () => {
  const { user, SignOutUser } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await SignOutUser();
    navigate("/login");
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} width={80} />
          </Navbar.Brand>
          <Form className="w-75">
            <InputGroup>
              <Form.Control type="search" className="border-0" />
              <InputGroup.Text className="bg-warning outline-0 border-0">
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-2">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    <p className="m-0 p-0 fs-6">Hello, {!user && "Sign in"}</p>
                    <p className="m-0 p-0 fs-6">Accounts</p>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/return-orders">
                    <p className="m-0 p-0 fs-6">Return</p>
                    <p className="m-0 p-0 fs-6">& Orders</p>
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Button
                    onClick={logoutUser}
                    className="bg-transparent text-white border-0 text-start"
                  >
                    <p className="m-0 p-0 fs-6 ">
                      Hello, {user && user.displayName}
                    </p>
                    <p className="m-0 p-0 fs-6 ">Signout</p>
                  </Button>
                  <Nav.Link as={NavLink} to="/return-orders">
                    <p className="m-0 p-0 fs-6">Return</p>
                    <p className="m-0 p-0 fs-6">& Orders</p>
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={NavLink} to="/cart">
                <AiOutlineShoppingCart />
                <p className="m-0 p-0 fs-6">Cart</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navmenu;
