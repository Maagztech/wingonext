"use client";
import React, { useState, useEffect } from "react";
import ChoseBetModal from "@/components/ChooseBaitModal";
import Image from "next/image";
import { useGlobalContext } from "@/context/globalContext";
import TimeActive from "@/assets/timeactive.png";
import TimeInactive from "@/assets/timeinactive.png";
import NavBar from "@/components/NavBar";
import zeroImg from "@/assets/0.png";
import oneImg from "@/assets/1.png";
import twoImg from "@/assets/2.png";
import threeImg from "@/assets/3.png";
import fourImg from "@/assets/4.png";
import fiveImg from "@/assets/5.png";
import sixImg from "@/assets/6.png";
import sevenImg from "@/assets/7.png";
import eightImg from "@/assets/8.png";
import nineImg from "@/assets/9.png";
import HistoryTable from "@/components/HistoryTable";
import RulesModal from "@/components/RulesModal";
import ScoreModal from "@/components/ScoreModal";


const images = [
    zeroImg,
    oneImg,
    twoImg,
    threeImg,
    fourImg,
    fiveImg,
    sixImg,
    sevenImg,
    eightImg,
    nineImg,
];

const GamePage: React.FC = () => {
    const { isMobile, bet = [], setBet }: any = useGlobalContext();
    const [timeRange, setTimeRange] = useState<number>(30);
    const [timeLeft, setTimeLeft] = useState<number>(timeRange);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [gameResult, setGameResult] = useState<number>(0);
    const [isSelecting, setIsSelecting] = useState<boolean>(true);
    const [rulesModalVisible, setRulesModalVisible] = useState<boolean>(false);
    const [selectChoice, setSelectChoice] = useState<string>("");
    const [selectDigit, setSelectDigit] = useState<number>(10);
    const [scoreModal, setScoreModal] = useState<boolean>(false);
    const handleColorClick = (color: string) => {
        if (isSelecting) {
            setSelectChoice(color.toLowerCase());
            setIsModalVisible(true);
        }
    };

    const handleDigitClick = (digit: number) => {
        if (isSelecting) {
            setSelectChoice("digit");
            setSelectDigit(digit);
            setIsModalVisible(true);
        }
    };

    const handelSmallBigChange = (Small: boolean) => {
        if (isSelecting) {
            setSelectChoice(Small ? "small" : "big");
            setIsModalVisible(true);
        }
    };


    const handleSubmitGame = () => {
        const randomDigit = Math.floor(Math.random() * 10);
        let finalResult = 0;
        if (bet.length === 0) return;
        for (const eachBet of bet) {
            const { contractAmount, selectedChoice, selectedDigit } = eachBet;
            console.log(eachBet);
            let result = 0;
            if (selectedChoice === "green") {
                if ([1, 3, 7, 9].includes(randomDigit)) {
                    result = contractAmount * 2;
                } else if (randomDigit === 5) {
                    result = contractAmount * 1.5;
                } else {
                    result = -contractAmount;
                }
            } else if (selectedChoice === "red") {
                if ([2, 4, 6, 8].includes(randomDigit)) {
                    result = contractAmount * 2;
                } else if (randomDigit === 0) {
                    result = contractAmount * 1.5;
                } else {
                    result = -contractAmount;
                }
            } else if (selectedChoice === "violet") {
                if ([0, 5].includes(randomDigit)) {
                    result = contractAmount * 4.5;
                } else {
                    result = -contractAmount;
                }
            } else if (selectedChoice === "number") {
                if (randomDigit === selectedDigit) {
                    result = contractAmount * 9;
                } else {
                    result = -contractAmount;
                }
            } else if (selectedChoice === "big") {
                if ([5, 6, 7, 8, 9].includes(randomDigit)) {
                    result = contractAmount * 2;
                } else {
                    result = -contractAmount;
                }
            } else if (selectedChoice === "small") {
                if ([0, 1, 2, 3, 4].includes(randomDigit)) {
                    result = contractAmount * 2;
                } else {
                    result = -contractAmount;
                }
            }
            finalResult += result;
        }
        setBet([])
        setGameResult(finalResult);
        setScoreModal(true);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const [isVisible, setIsVisible] = useState(true);  // Track visibility state
    const [buzzerAudio, setBuzzerAudio] = useState<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const buzzerAudio = new Audio("./buzz.wav");
            setBuzzerAudio(buzzerAudio);
        }
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add event listener to detect visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    useEffect(() => {
        if (buzzerAudio && timeLeft > 0 && timeLeft <= 5 && isVisible) {
            buzzerAudio.pause();
            buzzerAudio.currentTime = 0;
            buzzerAudio.play();
        }

        if (timeLeft === 1) {
            handleSubmitGame();
        }

        if (timeLeft <= 0) {
            setIsSelecting(true);
            setTimeLeft(timeRange);
        }
    }, [timeLeft, timeRange]);

    return (
        <div className="w-full h-full">
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-[20px] h-[70vh]">
                <div className="flex flex-col items-center sm:pl-[150px] sm:pt-[100px] bg-red-100 border border-gray-300 p-4 rounded-lg">
                    <button className="bg-red-500 p-2 rounded-bl-[8px] rounded-tr-[8px] text-white mb-4" onClick={() => setRulesModalVisible(true)}>How to play ?</button>
                    <div className="mb-4">
                        <div className="flex space-x-4">
                            {[30, 60, 180, 300].map((time) => (
                                <div
                                    key={time}
                                    onClick={() => {
                                        if (isSelecting) setTimeRange(time);
                                        setTimeLeft(time);
                                    }}
                                    className={`p-4 border border-black text-[14px] text-center cursor-pointer ${time === timeRange ? "bg-red-500 text-white" : "bg-gray-200"
                                        } rounded-md`}
                                >
                                    <Image
                                        src={time === timeRange ? TimeActive : TimeInactive}
                                        alt="Time"
                                        width={50}
                                        height={50}
                                    />
                                    {time === 30
                                        ? "30 Sec"
                                        : time === 60
                                            ? "1 Min"
                                            : time === 180
                                                ? "3 Min"
                                                : "5 Min"}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-16 h-16 flex justify-center items-center bg-red-500 text-white text-2xl font-bold rounded">
                            {Math.floor(timeLeft / 60)}
                        </div>

                        <div className="w-10 h-16 flex justify-center items-center bg-red-500 text-white text-2xl font-bold rounded">
                            :
                        </div>

                        <div className="w-16 h-16 flex justify-center items-center bg-red-500 text-white text-2xl font-bold rounded">
                            {String(Math.floor(timeLeft % 60)).padStart(2, "0")}
                        </div>
                    </div>
                </div>

                <div >
                    <div className="mb-4 flex flex-col items-center bg-red-100 border border-gray-300 p-4 rounded-lg">
                        <div className="flex space-x-4 mb-4">
                            {["Green", "Violet", "Red"].map((color, index) => (
                                <button
                                    key={color}
                                    onClick={() => handleColorClick(color)}
                                    className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out p-4 text-[20px] font-bold w-20 text-white ${color === "Red"
                                        ? "bg-red-500"
                                        : color === "Green"
                                            ? "bg-green-500"
                                            : "bg-violet-500"
                                        } ${index === 0 ? "rounded-l-[20px]" : ""} 
                ${index === 2 ? "rounded-r-[20px]" : ""} ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                        }`}
                                    disabled={!isSelecting}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap mb-4 bg-gray-200 p-4 rounded-lg">
                            {images.map((image, index) => (
                                <div key={index} className="p-2 w-1/5 flex justify-center">
                                    <Image
                                        src={image}
                                        alt={`Digit ${index}`}
                                        width={70}
                                        height={70}
                                        onClick={() => handleDigitClick(index)}
                                        className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out rounded-lg ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mb-4">
                            <button
                                onClick={() => handelSmallBigChange(true)}
                                className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out p-4 w-32 font-bold text-white bg-blue-500 ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                    } rounded-l-[15px] border border-gray-400`}
                                disabled={!isSelecting}
                            >
                                Small (0-4)
                            </button>
                            <button
                                onClick={() => handelSmallBigChange(false)}
                                className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out p-4 w-32 font-bold text-white bg-yellow-500 ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                    } rounded-r-[15px] border border-gray-400`}
                                disabled={!isSelecting}
                            >
                                Big (5-9)
                            </button>
                        </div>
                    </div>
                    <HistoryTable />
                </div>
            </div>
            <ChoseBetModal visible={isModalVisible} setVisible={setIsModalVisible} selectedChoice={selectChoice} selectedDigit={selectDigit} />
            <RulesModal visible={rulesModalVisible} setvisible={setRulesModalVisible} />
            <ScoreModal visible={scoreModal} setvisible={setScoreModal} winValue={gameResult} />
        </div>
    );
};

export default GamePage;
