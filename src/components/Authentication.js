import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Authentication({
  title,
  link,
  btn,
  fnx,
  email,
  password,
  setEmail,
  setPassword,
}) {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center bg-white"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <Card.Title className="fs-2 fw-normal">{title}</Card.Title>
              <Form onSubmit={fnx}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                    type="email"
                    id="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white"
                    type="password"
                    id="email"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100  bg-warning  bg-gradient shadow-none border-none"
                >
                  {title}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Link
            to={link}
            className="btn w-100 bg-gradeint bg-light text-dark mt-3 border border-dark"
          >
            {btn}
          </Link>
        </div>
      </Container>
    </>
  );
}
