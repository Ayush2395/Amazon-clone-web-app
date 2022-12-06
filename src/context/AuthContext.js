import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase.config";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const registerNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser);
      })
      .catch((error) => console.log(error.message));
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, [user]);

  return (
    <>
      <AppContext.Provider
        value={{ user, loginUser, registerNewUser, SignOutUser }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
