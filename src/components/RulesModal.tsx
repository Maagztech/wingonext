import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import { useGlobalContext } from "@/context/globalContext";
import Modal from "react-modal";

const RulesModal = ({ visible, setvisible }: any) => {
  const { isMobile } = useGlobalContext();

  const customStylesModal: Modal.Styles = {
    content: {
      top: isMobile ? "200px" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "auto" : "100%",
      width: isMobile ? "100%" : "400px",
      backgroundColor: "#252A3E",
      zIndex: 1050,
      fontFamily: "Oxanium",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    },
    overlay: {
      zIndex: 1040,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

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
        <div className="px-4 w-full overflow-y-scroll flex-grow mb-5">
          <div className="flex justify-center mt-3">
            {isMobile && <img src={Line.src} alt="Line" />}
          </div>
          <div
            className={`flex gap-2 justify-start mb-7 items-center ${isMobile ? "text-center mt-5" : "mt-10"
              }`}
          >
            <button
              onClick={() => setvisible(false)}
              className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {!isMobile && <img src={Back.src} alt="Back" />}
            </button>
            <p
              className={`font-semibold text-2xl ${isMobile ? "text-center flex-1" : ""
                }`}
            >
              Rules & Regulation
            </p>
          </div>

          <div className="text-white">
            <ol className="list-decimal pl-5">
              <li className="mb-4">
                Select <strong>green</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result shows 1, 3, 7, or 9, you get (98 × 2) = 196</li>
                  <li>If the result shows 5, you get (98 × 1.5) = 147</li>
                </ul>
              </li>
              <li className="mb-4">
                Select <strong>red</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result shows 2, 4, 6, or 8, you get (98 × 2) = 196</li>
                  <li>If the result shows 0, you get (98 × 1.5) = 147</li>
                </ul>
              </li>
              <li className="mb-4">
                Select <strong>violet</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result shows 0 or 5, you get (98 × 4.5) = 441</li>
                </ul>
              </li>
              <li className="mb-4">
                Select a specific <strong>number</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result matches the number you selected, you get (98 × 9) = 882</li>
                </ul>
              </li>
              <li className="mb-4">
                Select <strong>big</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result shows 5, 6, 7, 8, or 9, you get (98 × 2) = 196</li>
                </ul>
              </li>
              <li>
                Select <strong>small</strong>:
                <ul className="list-disc pl-5">
                  <li>If the result shows 0, 1, 2, 3, or 4, you get (98 × 2) = 196</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div
          className={`${!isMobile ? "bottomShadow" : ""
            } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
        >
          <button
            className="w-4/5 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
            onClick={() => setvisible(false)}
          >
            Okay
          </button>
          <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
        </div>
      </div>
    </Modal>
  );
};

export default RulesModal;
