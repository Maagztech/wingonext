import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import { useGlobalContext } from "@/context/globalContext";
import { useState } from "react";
import Modal from "react-modal";

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
    const { isMobile, setBet }: any = useGlobalContext();
    const [amount, setAmount] = useState<number | null>(null);
    const [multiplier, setMultiplier] = useState<number>(1);

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
            backgroundColor: "white",
            zIndex: 1050,
            fontFamily: "Oxanium",
            display: "flex",
            flexDirection: "column",
        },
        overlay: {
            zIndex: 1040,
        },
    };
    const addBet = () => {
        if (amount)
            setBet((prev: any[]) => [...prev, { selectedChoice, selectedDigit, contractAmount: amount * multiplier }])
        setVisible(false);
    }
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
                <div className="px-4 w-full overflow-y-scroll flex-grow mb-[20px]">
                    <div className="flex justify-center">
                        {isMobile && <img src={Line.src} alt="Line" />}
                    </div>
                    <div
                        className={`flex gap-[8px] justify-start mb-[28px] items-center ${isMobile ? "text-center mt-5" : "mt-[40px]"
                            }`}
                    >
                        <button
                            onClick={() => setVisible(false)}
                            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
                        >
                            {!isMobile && <img src={Back.src} alt="Back" />}
                        </button>
                        <p
                            className={`font-semibold text-2xl leading-6 ${isMobile ? "text-center flex-1" : ""
                                }`}
                            style={{ letterSpacing: "-0.04em" }}
                        >
                            Choose Your Bet
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg w-full max-w-md mx-auto">
                        <p className="font-semibold mb-2">Selected Choice: {selectedChoice}</p>
                        {selectedChoice === "Digit" && (
                            <p className="font-semibold mb-2">Selected Digit: {selectedDigit}</p>)}
                        <div className="mt-2">
                            <p className="font-semibold mb-2">Select Amount:</p>
                            <div className="grid grid-cols-4 gap-2">
                                {amountOptions.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setAmount(value)}
                                        className={`p-3 border rounded-lg text-center cursor-pointer ${amount === value ? "bg-blue-500 text-white" : "bg-gray-100"
                                            }`}
                                    >
                                        ₹ {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="font-semibold mb-2">Select Multiplier:</p>
                            <div className="grid grid-cols-4 gap-2">
                                {multiplierOptions.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setMultiplier(value)}
                                        className={`p-3 border rounded-lg text-center cursor-pointer ${multiplier === value ? "bg-blue-500 text-white" : "bg-gray-100"
                                            }`}
                                    >
                                        {value}X
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    className={`${!isMobile ? "bottomShadow" : ""
                        } sticky bottom-0 w-full bg-[#ffffff] flex flex-col items-center`}
                >
                    <img
                        src={Okay.src}
                        alt="Okay"
                        className="mt-3 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
                        onClick={() => addBet()}
                    />
                    <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;
