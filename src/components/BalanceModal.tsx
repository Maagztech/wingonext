import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import Scanner from "@/assets/scanner.jpg";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Money from "@/assets/circularCoin.png"
const BalanceModal = ({ visible, setvisible }: any) => {
    const { isMobile, accesstoken, fetchBalance, balance }: any = useGlobalContext();

    const [withdraw, setWithdraw] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
    const [upi, setUpi] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [transactionID, setTransactionID] = useState<string>("");

    useEffect(() => {
        if (accesstoken) fetchBalance();
    }, [accesstoken]);

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "dzdedmky");
            formData.append("cloud_name", "aababcab");
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/aababcab/image/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            toast("Please select a file to upload.");
            return;
        }

        try {
            const uploadedImageUrl = await uploadImage(selectedFile);
            if (!uploadedImageUrl) {
                toast("Failed to upload image. Please try again.");
                return;
            }
            await axios.post(
                "http://localhost:5000/api/add",
                { image: uploadedImageUrl, transactionID },
                { headers: { Authorization: accesstoken } }
            );
            toast("Our team will review and add to your balance soon!");
        } catch (error) {
            console.error("Error uploading file or sending data:", error);
            toast("Failed to submit the request. Please try again.");
        }
    };

    const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (withdrawAmount && withdrawAmount <= balance) {
            await axios.post(
                "http://localhost:5000/api/withdraw",
                { upi, amount: withdrawAmount },
                { headers: { Authorization: accesstoken } }
            );
            fetchBalance();
            toast("You will receive money in 15 minutes.");
            setUpi("");
            setWithdrawAmount(null);
        } else {
            toast("Withdraw amount cannot exceed your balance!");
        }
    };

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
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
        },
        overlay: { zIndex: 1040 },
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={visible}
            onRequestClose={() => setvisible(false)}
            style={customStylesModal}
            className="Modal overflow-x-hidden text-white"
            overlayClassName="Overlay"
            contentLabel="Balance Modal"
        >
            <ToastContainer />
            <div className="flex flex-col h-full relative">
                <div className="px-4 w-full overflow-y-scroll flex-grow mb-5">
                    <div className="flex justify-center">
                        {isMobile && <img src={Line.src} alt="Line" />}
                    </div>
                    <div className={`flex items-center gap-2 ${isMobile ? "mt-5" : "mt-10"}`}>
                        <button onClick={() => setvisible(false)} className="hover:scale-105">
                            {!isMobile && <img src={Back.src} alt="Back" />}
                        </button>
                        <p className={`font-semibold text-2xl ${isMobile ? "text-center flex-1" : ""
                            }`}>
                            Your Balance
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="p-2 border border-white rounded-full flex items-center justify-center gap-2 ">
                            <img src={Money.src} height={20} width={20} alt="Money" />
                            <p className="text-xl font-bold text-white text-center ">Balance: {balance}</p>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className={`p-2 border rounded-lg ${withdraw ? "bg-gray-200 text-black" : "bg-red-500 text-white"}`}
                                onClick={() => setWithdraw(false)}
                            >
                                Add Balance
                            </button>
                            <button
                                className={`p-2 border rounded-lg ${withdraw ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
                                onClick={() => setWithdraw(true)}
                            >
                                Withdraw Balance
                            </button>
                        </div>
                        <div className="container mt-6 border border-gray-700 bg-gradient-to-b from-[#1E2A3A] to-[#3E497A] rounded-lg w-full max-w-md shadow-lg p-2 py-4">
                            {!withdraw ? (
                                <form onSubmit={handleAdd} className="mx-2">
                                    <p className="italic font-bold text-center text-white">
                                        Scan Pay and Upload Screenshot
                                    </p>
                                    <img src={Scanner.src} alt="Scanner" className="w-full mt-4 rounded-lg shadow-md" />
                                    <div className="mt-5">
                                        <label className="block text-sm font-medium text-white mb-1">
                                            Transaction ID
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setTransactionID(e.target.value)}
                                            className="p-2 w-full border rounded-lg text-black text-opacity-60"
                                            placeholder="Enter transaction ID"
                                            required
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="block text-sm font-medium text-wghite mb-1">
                                            Upload Screenshot
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="p-2 w-full border rounded-lg text-opacity-60"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-5 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Submit
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleWithdraw} className="mx-2">
                                    <p className="italic font-bold text-center text-white">Withdraw</p>
                                    <div className="mt-5">
                                        <label className="block text-sm font-medium text-white mb-1">
                                            Withdraw Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={withdrawAmount || ""}
                                            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                            className="p-2 w-full border rounded-lg text-black text-opacity-60"
                                            placeholder="Enter amount"
                                            required
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="block text-sm font-medium text-white mb-1">UPI ID</label>
                                        <input
                                            value={upi}
                                            onChange={(e) => setUpi(e.target.value)}
                                            className="p-2 w-full border rounded-lg text-black text-opacity-60"
                                            placeholder="Enter UPI ID"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-5 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Proceed to Withdraw
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 flex flex-col items-center">
                    <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
                </div>
            </div>
        </Modal>
    );
};

export default BalanceModal;
