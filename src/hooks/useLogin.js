import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogin = () => {
  const [error, setError] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async (email, password) => {
    setError({ error: false, msg: "" });
    if (!email || !password) {
      return setError({ error: true, msg: "Please check email and password" });
    }

    try {
      await loginUser(email, password);
      email = "";
      password = "";
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError({ error: true, msg: "Password you've entered is wrong" });
          break;
        case "auth/user-not-found":
          setError({
            error: true,
            msg: "This email isn't register, please signup first",
          });
          break;
        default:
          setError({ error: true, msg: error.code });
      }
    }
  };

  return { handleLogin, error };
};

export default useLogin;
