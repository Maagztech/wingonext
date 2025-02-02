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
    const { gameData }: { gameData: { totalUserResult: number } } = useGlobalContext();
    const { accesstoken, timeleft, setIntervals, interval }: any = useGlobalContext();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isSelecting, setIsSelecting] = useState<boolean>(true);
    const [rulesModalVisible, setRulesModalVisible] = useState<boolean>(false);
    const [selectChoice, setSelectChoice] = useState<string>("");
    const [selectDigit, setSelectDigit] = useState<number>(10);
    const [scoreModal, setScoreModal] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(true);
    const [buzzerAudio, setBuzzerAudio] = useState<HTMLAudioElement | null>(null);
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const buzzerAudio = new Audio("./beep.mp3");
            setBuzzerAudio(buzzerAudio);
        }
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    useEffect(() => {
        if (buzzerAudio && timeleft > 0 && timeleft <= 5 && isVisible) {
            buzzerAudio.currentTime = 0;
            buzzerAudio.play();
        }
        if (timeleft <= 5) setIsModalVisible(false);
        if (timeleft === 0 && gameData?.totalUserResult && gameData?.totalUserResult != 0) setScoreModal(true);
    }, [timeleft]);

    return (
        <div className="w-full h-full">
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-[20px] h-[70vh] pt-[80px]">
                <div className="flex flex-col items-center sm:pt-[100px] bg-red-100 border border-gray-300 p-4 rounded-lg">
                    <button className="bg-red-500 p-2 rounded-bl-[8px] rounded-tr-[8px] text-white mb-4 text-[10px] font-bold" onClick={() => setRulesModalVisible(true)}>How to play ?</button>
                    <div className="mb-4">
                        <div className="flex gap-1">
                            {[30, 60, 180, 300, 600].map((time) => (
                                <div
                                    key={time}
                                    onClick={() => {
                                        if (isSelecting) setIntervals(time);
                                    }}
                                    className={`px-4 py-2  text-[10px] relative border border-white font-bold text-center cursor-pointer ${time === interval ? "bg-red-500 text-white" : "bg-gray-200"
                                        } rounded-md`}
                                >
                                    {time === 600 && <div className="absolute text-[10px] bg-white text-black p-[1px] font-bold rounded top-1 left-1">5D</div>}
                                    <Image
                                        src={time === interval ? TimeActive : TimeInactive}
                                        alt="Time"
                                        width={70}
                                        height={70}
                                    />
                                    {time === 30
                                        ? "30 Sec"
                                        : time === 60
                                            ? "1 Min"
                                            : time === 180
                                                ? "3 Min"
                                                : time === 300
                                                    ? "5 Min"
                                                    : "10 Min"}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 flex justify-center items-center bg-red-500 text-white text-lg font-bold rounded">
                            {Math.floor(timeleft / 60)}
                        </div>

                        <div className="w-5 h-8 flex justify-center items-center bg-red-500 text-white text-lg font-bold rounded">
                            :
                        </div>

                        <div className="w-8 h-8 flex justify-center items-center bg-red-500 text-white text-lg font-bold rounded">
                            {String(Math.floor(timeleft % 60)).padStart(2, "0")}
                        </div>
                    </div>
                </div>

                <div >
                    <div className="relative">
                        {timeleft <= 5 &&
                            <div className="absolute w-full h-full flex justify-center items-center bg-slate-600 bg-opacity-30 rounded-lg z-10 overflow-hidden">
                                <div className="flex justify-center space-x-4 mb-4">
                                    <div className="w-32 h-32 flex justify-center items-center bg-red-500 text-white text-7xl font-bold rounded">
                                        {Math.floor(timeleft / 60)}
                                    </div>

                                    <div className="w-12 h-32 flex justify-center items-center bg-red-500 text-white text-7xl font-bold rounded">
                                        :
                                    </div>

                                    <div className="w-32 h-32 flex justify-center items-center bg-red-500 text-white text-7xl font-bold rounded">
                                        {String(Math.floor(timeleft % 60)).padStart(2, "0")}
                                    </div>
                                </div>
                            </div>}

                        <div className="mb-4 flex flex-col items-center bg-red-100 border border-gray-300 p-4 rounded-lg">
                            <div className="flex space-x-4 mb-4">
                                {["Green", "Violet", "Red"].map((color, index) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorClick(color)}
                                        className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out text-base py-1 md:py-2 font-bold w-20 md:w-36 text-white ${color === "Red"
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
                                    className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out text-base py-1 md:py-2 w-32 md:w-40 font-bold text-white bg-blue-500 ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                        } rounded-l-[15px]`}
                                    disabled={!isSelecting}
                                >
                                    Small
                                </button>
                                <button
                                    onClick={() => handelSmallBigChange(false)}
                                    className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out text-base py-1 md:py-2 w-32 md:w-40 font-bold text-white bg-yellow-500 ${!isSelecting ? "cursor-not-allowed opacity-50" : ""
                                        } rounded-r-[15px]`}
                                    disabled={!isSelecting}
                                >
                                    Big
                                </button>
                            </div>
                        </div>
                    </div>
                    <HistoryTable />
                </div>
            </div>
            <ChoseBetModal visible={isModalVisible} setVisible={setIsModalVisible} selectedChoice={selectChoice} selectedDigit={selectDigit} />
            <RulesModal visible={rulesModalVisible} setvisible={setRulesModalVisible} />
            <ScoreModal visible={scoreModal} setvisible={setScoreModal} />
        </div>
    );
};

export default GamePage;
