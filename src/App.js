import React, { useState } from "react";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageError from "./components/PageError";
import Navmenu from "./components/Navmenu";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Authentication from "./components/Authentication";
import { useAppState } from "./api/ContextApi";
library.add(faMagnifyingGlass, faCartShopping);

export default function App() {
  const { registerNewUser, loginUser, setError } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisterNewUser = async (event) => {
    event.preventDefault();
    setError("");
    if (email === "" || password === "") {
      return setError({ error: true, msg: "Missing fields" });
    }

    try {
      await registerNewUser(email, password);
      navigate("/");
    } catch (err) {
      setError({ error: true, msg: err.code });
    }

    setEmail("");
    setPassword("");
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    setError("");
    if (email === "" || password === "")
      return setError({ error: true, msg: "Missing fields" });

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      setError({ error: true, msg: err.code });
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Navmenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Authentication
              title="Sign in"
              link="/register"
              btn="Create your Amazon account"
              fnx={handleLoginUser}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Authentication
              title="Create Account"
              link="/login"
              btn="Already have an account?"
              fnx={handleRegisterNewUser}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          }
        />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
}
