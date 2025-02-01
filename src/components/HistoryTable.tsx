import React from "react";

const HistoryTable = ({ history }: any) => {
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

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center border px-[2px] py-2 bg-gradient-to-r from-red-500 to-white rounded-lg text-white">Win History</h2>
            <table className="w-full border border-gray-300 text-xs md:text-base rounded-lg">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="px-[2px] py-2 border border-gray-300">Period</th>
                        <th className="px-[2px] py-2 border border-gray-300 ">Number</th>
                        <th className="px-[2px] py-2 border border-gray-300 ">Big/Small</th>
                        <th className="px-[2px] py-2 border border-gray-300 ">Color(s)</th>
                        <th className="px-[2px] py-2 border border-gray-300 ">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {history?.map((result: any, index: number) => {
                        // Find the matching option for the current number
                        const option = options.find(opt => opt.number === result.number);

                        return (
                            <tr key={index} className="text-center">
                                <td className="px-[2px] py-2 border border-gray-300 ">0000</td>
                                <td className="px-[2px] py-2 border border-gray-300 ">{result.number}</td>
                                <td className="px-[2px] py-2 border border-gray-300 ">{option?.bigSmall || "Unknown"}</td>
                                <td className="px-[2px] py-2 border border-gray-300 ">
                                    {option?.colors.map((color, colorIndex) => (
                                        <span
                                            key={colorIndex}
                                            className={`font-bold ${getColorClass(color)} ${colorIndex > 0 ? "ml-2" : ""}`}
                                        >
                                            {color}
                                        </span>
                                    )) || "Unknown"}
                                </td>
                                <td
                                    className={`px-[2px] py-2 border border-gray-300  font-bold ${result.result < 0 ? "text-red-500" : "text-green-500"
                                        }`}
                                >
                                    {result.result}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;
