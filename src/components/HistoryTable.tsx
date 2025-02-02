import { useGlobalContext } from "@/context/globalContext";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const HistoryTable = () => {
    const { gameData, interval, accesstoken }: { gameData: { randomDigit: number; totalUserResult: number; period: number }; interval: string; accesstoken: string } = useGlobalContext();
    const [history, setHistory] = useState<{ period: number; number: number; result: number }[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const options = [
        { number: 0, bigSmall: "Small", colors: ["Red", "Violet"] },
        { number: 1, bigSmall: "Small", colors: ["Green"] },
        { number: 2, bigSmall: "Small", colors: ["Red"] },
        { number: 3, bigSmall: "Small", colors: ["Green"] },
        { number: 4, bigSmall: "Small", colors: ["Red"] },
        { number: 5, bigSmall: "Big", colors: ["Violet", "Green"] },
        { number: 6, bigSmall: "Big", colors: ["Red"] },
        { number: 7, bigSmall: "Big", colors: ["Green"] },
        { number: 8, bigSmall: "Big", colors: ["Red"] },
        { number: 9, bigSmall: "Big", colors: ["Green"] },
    ];

    const getColorClass = (color: string) => {
        switch (color) {
            case "Red":
                return "text-red-500";
            case "Green":
                return "text-green-500";
            case "Violet":
                return "text-purple-500";
            default:
                return "";
        }
    };

    const fetchHistory = async (pageNum: number) => {
        if (loading || !accesstoken) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `https://wingobackend-x4wo.onrender.com/api/fetchhistory?interval=${interval}&page=${pageNum}`,
                { headers: { Authorization: accesstoken } }
            );
            if (pageNum === 1) setHistory(response.data.history);
            else
                setHistory((prev) => [...prev, ...response.data.history]);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setPage(1);
        fetchHistory(1); // Fetch history immediately when interval changes
    }, [interval]);

    useEffect(() => {
        if (!accesstoken) return;
        fetchHistory(page); // Fetch history when page changes
    }, [accesstoken, page]);

    useEffect(() => {
        if (gameData) {
            setHistory((prev) => [
                { number: gameData.randomDigit, result: gameData.totalUserResult, period: gameData.period },
                ...prev,
            ]);
        }
    }, [gameData]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center border px-[2px] py-2 bg-gradient-to-r from-red-500 to-white rounded-lg text-white">
                Win History
            </h2>
            <table className="w-full border border-gray-300 text-xs md:text-base rounded-lg">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="px-[2px] py-2 border border-gray-300">Period</th>
                        <th className="px-[2px] py-2 border border-gray-300">Number</th>
                        <th className="px-[2px] py-2 border border-gray-300">Big/Small</th>
                        <th className="px-[2px] py-2 border border-gray-300">Color(s)</th>
                        <th className="px-[2px] py-2 border border-gray-300">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {history?.map((result: any, index: number) => {
                        const option = options.find((opt) => opt.number === result.number);

                        return (
                            <tr key={index} className="text-center">
                                <td className="px-[2px] py-2 border border-gray-300">{result.period || "0000"}</td>
                                <td className="px-[2px] py-2 border border-gray-300">{result.number}</td>
                                <td className="px-[2px] py-2 border border-gray-300">{option?.bigSmall || "Unknown"}</td>
                                <td className="px-[2px] py-2 border border-gray-300">
                                    {option?.colors.map((color, colorIndex) => (
                                        <span
                                            key={colorIndex}
                                            className={`font-bold ${getColorClass(color)} ${colorIndex > 0 ? "ml-2" : ""}`}
                                        >
                                            {color}
                                        </span>
                                    )) || "Unknown"}
                                </td>
                                <td className={`px-[2px] py-2 border border-gray-300 font-bold ${result.result < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {result.result}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div ref={observerRef} className="h-10"></div>
        </div>
    );
};

export default HistoryTable;
