"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext"; // Adjust the import to where your context is located

const useWebSocket = () => {
  const { user }: { user: { _id: string } | null } = useGlobalContext();
  const [gameData, setGameData] = useState(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!user) return; // Don't establish WebSocket connection if the user isn't available

    const wsUrl = `ws://localhost:5000?user=${user._id}`; // Replace with your backend WebSocket URL

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received game update:", data);
      setGameData(data);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected!");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user]); // Re-run the effect when user changes

  return { gameData, socket };
};

export default useWebSocket;
