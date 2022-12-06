import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import validator from "validator";
import { auth } from "../backend/firebase.config";
import { updateProfile } from "firebase/auth";

const useSignup = () => {
  const [error, setError] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const { registerNewUser } = useAuth();

  const handleSignup = async (email, password, rePassword, displayName) => {
    setError({ error: false, msg: "" });

    if (!email || !password || !displayName)
      return setError({ error: true, msg: "Every fields are required" });

    if (!validator.isEmail(email)) {
      return setError({ error: true, msg: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return setError({
        error: true,
        msg: "Your password is weak, add special character",
      });
    }

    if (password !== rePassword) {
      return setError({
        error: true,
        msg: "Password does not match with re-enter password",
      });
    }

    try {
      await registerNewUser(email, password).then(() => {
        const userName = auth.currentUser;
        updateProfile(userName, { displayName: displayName });
      });
      email = "";
      password = "";
      navigate("/");
    } catch (error) {
      switch (error.code) {
        default:
          setError({ error: true, msg: error.code });
      }
    }
  };

  return { error, handleSignup };
};

export default useSignup;
