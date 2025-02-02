"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [gameData, setGameData] = useState(null);
  const [socket, setSocket] = useState(null);
  const router = useRouter();

  const fetchBalance = async () => {
    const response = await axios.get("http://localhost:5000/api/fetchbalance", {
      headers: { Authorization: accesstoken },
    });
    setBalance(response.data.balance);
  };

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
    return data || null;
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

  useEffect(() => {
    if (!user) return;
    const wsUrl = `ws://localhost:5000?user=${user._id}`;
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => console.log("WebSocket connected!");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.balance) setBalance(data.balance);
      if (data.type === "result" && data.interval === interval) {
        setGameData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(data) ? data : prev
        );
      }
    };
    ws.onclose = () => console.log("WebSocket disconnected!");
    setSocket(ws);
    return () => ws.close();
  }, [user]);

  const placeBet = (
    selectedChoice,
    selectedDigit,
    amount,
    multiplier,
    interval
  ) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "placeBet",
          bet: {
            selectedChoice,
            selectedDigit,
            contractAmount: amount * multiplier,
          },
          interval,
        })
      );
    } else {
      console.log("WebSocket is not connected.");
    }
  };

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
        gameData,
        placeBet,
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
