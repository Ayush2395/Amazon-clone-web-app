import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { auth } from "../backend/firebase.config";

const API = createContext();

export const ContextApi = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  //   authenthication and error message
  const [error, setError] = useState({ error: false, mag: "" });
  const [user, setUser] = useState("");

  const registerNewUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      sendEmailVerification(auth.currentUser);
    });
  };

  const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      setError({ error: false, msg: "Welcome to Amazon" });
    });
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <API.Provider
        value={{
          user,
          cartCount,
          setCartCount,
          registerNewUser,
          loginUser,
          signOutUser,
          error,
          setError,
        }}
      >
        {children}
      </API.Provider>
    </>
  );
};

export const useAppState = () => {
  return useContext(API);
};
