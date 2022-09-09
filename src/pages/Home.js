import React from "react";
import { Alert } from "react-bootstrap";
import { useAppState } from "../api/ContextApi";

export default function Home() {
  const { error, setError } = useAppState();
  return (
    <>
      <section className="section" id="home">
        <div className="main container">
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible className="w-50 m-auto mt-3"
              onClose={() => {
                setError("");
              }}
            >
              {error?.msg}
            </Alert>
          )}
          <h1 className="text-warning">Hello</h1>
        </div>
      </section>
    </>
  );
}
