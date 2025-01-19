"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  use,
} from "react";
import { useMediaQuery } from "react-responsive";
const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const isMobileQuery = useMediaQuery({ query: "(max-width: 800px)" });
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(isMobileQuery);
    }
  }, [isMobileQuery]);

  const [bet, setBet] = useState([]);
  useEffect(() => {
    console.log(bet);
  }, [bet]);

  return (
    <GlobalContext.Provider value={{ isMobile, bet, setBet }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
