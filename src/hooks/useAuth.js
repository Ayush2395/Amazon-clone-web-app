import { useContext } from "react";
import { AppContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw Error("useAuth must be used inside AppContextProvider");
  } else {
    return context;
  }
};

export default useAuth;
