"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  use,
} from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import moment from "moment";
const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const isMobileQuery = useMediaQuery({ query: "(max-width: 800px)" });
  const [isMobile, setIsMobile] = useState(null);
  const [bet, setBet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accesstoken, setAccessToken] = useState(null);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [interval, setIntervals] = useState(30);
  const [timeleft, setTimeleft] = useState(30);
  const fetchBalance = async () => {
    const response = await axios.get("http://localhost:5000/api/fetchbalance", {
      headers: { Authorization: accesstoken },
    });
    setBalance(response.data.balance);
  };

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(isMobileQuery);
    }
  }, [isMobileQuery]);

  const signInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );
      const user = response.data;
      setUser(user.user);
      setAccessToken(user.access_token);
      router.replace("/spin");
      localStorage.setItem("refresh_token", user.refresh_token);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getLocalUser = async () => {
    const data = localStorage.getItem("refresh_token");
    if (!data) return null;
    return data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const refresh_token = await getLocalUser();
        if (refresh_token) {
          const response = await axios.post(
            "http://localhost:5000/api/refresh_token",
            { refresh_token }
          );
          setUser(response.data.user);
          router.replace("/spin");
          setAccessToken(response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
        } else {
          router.replace("/");
        }
      } catch (error) {
        localStorage.removeItem("refresh_token");
        router.replace("/");
      }
      setIsLoading(false);
    };
    if (typeof window !== "undefined") fetchUser();
  }, []);

  useEffect(() => {
    const now = moment();
    const secondsElapsed = now.seconds();
    const secondsUntilNextStart = interval - (secondsElapsed % interval);
    setTimeleft(secondsUntilNextStart);
  }, [interval]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeleft((prev) => (prev === 0 ? interval : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeleft, interval]);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isMobile,
        bet,
        setBet,
        signInUser,
        accesstoken,
        balance,
        setBalance,
        fetchBalance,
        user,
        interval,
        setIntervals,
        timeleft,
        setTimeleft,
      }}
    >
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
