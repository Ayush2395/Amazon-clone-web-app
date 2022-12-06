import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/*============components and pages======== */
import Navmenu from "./components/Navmenu";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import Orders from "./pages/Orders";
import Preview from "./components/Preview";
import Cart from "./pages/Cart";

const App = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Navmenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/return-orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
