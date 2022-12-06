import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error } = useLogin();

  const LoginUser = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {error?.msg && (
            <Alert variant={error?.error ? "danger" : "success"}>
              {error?.msg}
            </Alert>
          )}
          <div className="card">
            <div className="card-body">
              <div className="card-title display-5 fw-normal text-center">
                Login
              </div>
              <Form onSubmit={LoginUser}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your mail"
                    id="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="your password here"
                    id="password"
                  />
                </Form.Group>
                <Button type="submit" className="bg-gradient bg-warning w-100">
                  Login
                </Button>
              </Form>
            </div>
          </div>
          <Link
            to="/signup"
            className="btn btn-light bg-gradient w-100 mt-3 border border-dark"
          >
            Create your Amazon account
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;
