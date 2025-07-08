"use client";
import { useGlobalContext } from "@/context/globalContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const HistoryTable = () => {
    const { gameData, interval, accesstoken, timeleft }: any = useGlobalContext();
    const [history, setHistory] = useState<{ period: number; number: number; result: number }[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
        if (!accesstoken) return;
        try {
            const response = await axios.get(
                `http://localhost:5000/api/fetchhistory?interval=${interval}&page=${pageNum}`,
                { headers: { Authorization: accesstoken } }
            );
            if (response.data.history.length === 0) {
                setHasMore(false);
                return;
            }
            setHistory((prev) => (pageNum === 1 ? response.data.history : [...prev, ...response.data.history]));
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchHistory(1);
    }, [interval, accesstoken]);

    useEffect(() => {
        if (gameData && timeleft == 0) {
            if (gameData.interval === interval)
                setHistory((prev) => [
                    { number: gameData.randomDigit, result: gameData.totalUserResult, period: gameData.period },
                    ...prev,
                ]);
        }
    }, [gameData, timeleft]);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center border px-[2px] py-2 bg-gradient-to-r from-red-500 to-white rounded-lg text-white">
                Win History
            </h2>
            <InfiniteScroll
                dataLength={history.length}
                next={() => {
                    setPage((prev) => prev + 1);
                    fetchHistory(page + 1);
                }}
                hasMore={hasMore}
                loader={<p className="text-center text-gray-500">Loading more...</p>}
            >
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
                        {history?.map((result, index) => {
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
                                        {result.result.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    );
};

export default HistoryTable;
