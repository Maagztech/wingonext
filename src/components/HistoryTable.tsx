import React from "react";

const HistoryTable = () => {
    const gameHistory = [
        { number: 7, bigSmall: "Big", colors: ["Red"], result: -100 },
        { number: 2, bigSmall: "Small", colors: ["Green"], result: +10 },
        { number: 9, bigSmall: "Big", colors: ["Violet"], result: +50 },
        { number: 4, bigSmall: "Small", colors: ["Red", "Green"], result: 0 },
        { number: 5, bigSmall: "Big", colors: ["Violet", "Red"], result: +10 },
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

    return (
        <div className=" w-full">
            <h2 className="text-xl font-bold mb-4 text-center border p-2 bg-gradient-to-r from-red-500 to-white rounded-lg text-white">Win History</h2>
            <table className="w-full border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="p-2 border border-gray-300">Number</th>
                        <th className="p-2 border border-gray-300">Big/Small</th>
                        <th className="p-2 border border-gray-300">Color(s)</th>
                        <th className="p-2 border border-gray-300">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {gameHistory.map((game, index) => (
                        <tr key={index} className="text-center">
                            <td className="p-2 border border-gray-300">{game.number}</td>
                            <td className="p-2 border border-gray-300">{game.bigSmall}</td>
                            <td className="p-2 border border-gray-300">
                                {game.colors.map((color, colorIndex) => (
                                    <span
                                        key={colorIndex}
                                        className={`font-bold ${getColorClass(color)} ${colorIndex > 0 ? "ml-2" : ""
                                            }`}
                                    >
                                        {color}
                                    </span>
                                ))}
                            </td>
                            <td
                                className={`p-2 border border-gray-300 font-bold ${game.result < 0 ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {game.result}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;
