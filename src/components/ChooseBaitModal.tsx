import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Modal from "react-modal";
import { useGlobalContext } from "@/context/globalContext";
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalComponentProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedChoice: string;
    selectedDigit: number;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
    visible,
    setVisible,
    selectedChoice,
    selectedDigit,
}) => {
    const { isMobile, interval, balance, user }: any = useGlobalContext();
    if (!user) return null;
    const [amount, setAmount] = useState<number | null>(null);
    const [multiplier, setMultiplier] = useState<number>(1);
    const { placeBet }: any = useGlobalContext();
    const amountOptions = [1, 10, 100, 1000];
    const multiplierOptions = [1, 2, 5, 100];

    const customStylesModal: Modal.Styles = {
        content: {
            top: isMobile ? "171px" : "0%",
            left: isMobile ? "0%" : "auto",
            right: "0%",
            bottom: "0%",
            height: isMobile ? "auto" : "100%",
            width: isMobile ? "100%" : "400px",
            backgroundColor: "#252A3E",
            zIndex: 1050,
            fontFamily: "Oxanium, sans-serif",
            display: "flex",
            flexDirection: "column",
            color: "white",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
        },
        overlay: {
            zIndex: 1040,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
    };

    const addBet = () => {
        if (!amount || balance < amount) {
            toast("You don't have enough balance");
            return;
        }
        placeBet(selectedChoice, selectedDigit, amount, multiplier, interval);
        setVisible(false);
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={visible}
            onRequestClose={() => setVisible(false)}
            style={customStylesModal}
            className="Modal overflow-x-hidden"
            overlayClassName="Overlay"
            contentLabel="Modal"
        >
            <div className="flex flex-col h-full relative">
                <div className="px-4 w-full overflow-y-scroll flex-grow mb-5">
                    <div className="flex justify-center">
                        {isMobile && <img src={Line.src} alt="Line" />}
                    </div>
                    <div
                        className={`flex gap-4 justify-start items-center mb-7 ${isMobile ? "text-center mt-5" : "mt-10"
                            }`}
                    >
                        <button
                            onClick={() => setVisible(false)}
                            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
                        >
                            {!isMobile && <img src={Back.src} alt="Back" />}
                        </button>
                        <p
                            className={`font-semibold text-2xl ${isMobile ? "text-center flex-1" : ""
                                }`}
                        >
                            Choose Your Bet
                        </p>
                    </div>

                    <div className="p-4 border border-gray-700 bg-gradient-to-b from-[#1E2A3A] to-[#3E497A] rounded-lg w-full max-w-md mx-auto">
                        <p className="font-bold text-lg mb-2">Selected Choice: {selectedChoice}</p>
                        {selectedChoice === "digit" && (
                            <p className="font-bold text-lg mb-2">Selected Digit: {selectedDigit}</p>
                        )}
                        <div className="mt-4">
                            <p className="font-semibold mb-3">Select Amount:</p>
                            <div className="grid grid-cols-4 gap-3">
                                {amountOptions.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setAmount(value)}
                                        className={`p-3 rounded-lg text-center transition-all duration-300 ${amount === value
                                            ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                            }`}
                                    >
                                        ₹ {value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="font-semibold mb-3">Select Multiplier:</p>
                            <div className="grid grid-cols-4 gap-3">
                                {multiplierOptions.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setMultiplier(value)}
                                        className={`p-3 rounded-lg text-center transition-all duration-300 ${multiplier === value
                                            ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                            }`}
                                    >
                                        {value}X
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 w-full bg-[#1E2A3A] py-4 flex flex-col items-center border-t border-gray-700">
                    <div className="flex justify-around items-center w-full px-4">
                        <button
                            className="w-1/3 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
                            onClick={() => setVisible(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-1/3 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                            onClick={() => addBet()}
                        >
                            Add Bet
                        </button>
                    </div>
                    <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;