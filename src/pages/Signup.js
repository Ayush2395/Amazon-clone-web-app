import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rePassword, setRePassword] = useState("");

  const { error, handleSignup } = useSignup();

  const SignupUser = async (e) => {
    e.preventDefault();
    await handleSignup(email, password, rePassword, displayName);
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
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
                Create account
              </div>
              <Form onSubmit={SignupUser}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name">Your name</Form.Label>
                  <Form.Control
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                  />
                </Form.Group>
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="re-password">
                    Re-enter password
                  </Form.Label>
                  <Form.Control
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    type="password"
                    placeholder="your re-enter password here"
                    id="re-password"
                  />
                </Form.Group>
                <Button type="submit" className="bg-gradient bg-warning w-100">
                  Signup
                </Button>
              </Form>
            </div>
            <p className="px-4">
              Already have an account? <Link to="/login">signin</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
