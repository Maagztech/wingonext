"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext"; // Adjust the import to where your context is located

const useWebSocket = () => {
  const { user, setBalance }: any = useGlobalContext();
  const [gameData, setGameData] = useState<{
    balance: number;
    randomDigit: number;
    totalUserResult: number;
    interval: number;
    period: number;
  } | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!user) return;

    const wsUrl = `ws://localhost:5000?user=${user._id}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received game update:", data);
      if (data.balance) setBalance(data.balance);
      if (data.type === "result") setGameData(data);
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected!");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user]);

  const placeBet = (
    selectedChoice: string,
    selectedDigit: number,
    amount: number,
    multiplier: number,
    interval: number
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

  return { gameData, placeBet };
};

export default useWebSocket;
