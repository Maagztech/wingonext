import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import { useGlobalContext } from "@/context/globalContext";
import { useState } from "react";
import Modal from "react-modal";
import Scanner from "@/assets/scanner.jpg"

const BalanceModal = ({ visible, setvisible }: any) => {
    const { isMobile } = useGlobalContext();
    const [withdraw, setWithdraw] = useState(false)
    const [withdrawAmount, setWithdrawAmount] = useState<null | number>(null);
    const balance = 100;
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

    const handleWithdraw = async () => {

    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={visible}
            onRequestClose={() => setvisible(false)}
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
                            onClick={() => setvisible(false)}
                            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
                        >
                            {!isMobile && <img src={Back.src} alt="Back" />}
                        </button>
                        <p
                            className={`font-semibold text-2xl leading-6 ${isMobile ? "text-center flex-1" : ""
                                }`}
                            style={{ letterSpacing: "-0.04em" }}
                        >
                            Your Balance
                        </p>
                    </div>
                    <div>
                        <div>
                            <p className="text-[#1D1D1D] text-[20px] font-bold">Balance : 100</p>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <p className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out p-2 border border-gray-200 rounded-lg ${withdraw ? "bg-gray-200" : "bg-red-500  text-white"}`} onClick={() => setWithdraw(false)}>ADD Balance</p>
                            <p className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out p-2 border border-gray-200 rounded-lg ${!withdraw ? "bg-gray-200" : "bg-red-500  text-white"}`} onClick={() => setWithdraw(true)}>Withdraw Balance</p>
                        </div>
                        <div className="container mt-2 mx-auto p-6 max-w-lg bg-gray-100 shadow-md rounded-lg">
                            {!withdraw ? (
                                <div>
                                    <p className="mt-3 italic font-bold text-center text-gray-700">Scan Pay and Upload Screenshot</p>
                                    <img src={Scanner.src} alt="Scanner" className="w-full mt-4 rounded-lg shadow-md" />
                                    <form className="mt-5">
                                        <label htmlFor="screenshotUpload" className="block text-sm font-medium text-gray-700">
                                            Upload Screenshot
                                        </label>
                                        <input
                                            type="file"
                                            id="screenshotUpload"
                                            name="screenshot"
                                            accept="image/*"
                                            className="mt-2 p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="mt-3 italic font-bold text-gray-700">Withdraw</p>
                                    <form
                                        className="mt-5"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (withdrawAmount === null) return;
                                            if (withdrawAmount > balance) {
                                                alert("Withdraw amount cannot exceed your balance!");
                                            } else {
                                                handleWithdraw();
                                            }
                                        }}
                                    >
                                        <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700">
                                            Enter Withdraw Amount
                                        </label>
                                        <input
                                            type="number"
                                            id="withdrawAmount"
                                            value={withdrawAmount || ""}
                                            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                            className="mt-2 p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Enter amount"
                                            min="1"
                                            max={balance}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="mt-4 w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Proceed to Withdraw
                                        </button>
                                    </form>
                                </div>
                            )}
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
                        onClick={() => setvisible(false)}
                    />
                    <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
                </div>
            </div>
        </Modal>
    );
};

export default BalanceModal;
