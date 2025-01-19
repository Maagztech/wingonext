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
              Rules & Regulation
            </p>
          </div>

          <div>
            <ol>
              <li>
                Select <strong>green</strong>:
                <ul>
                  <li>If the result shows 1, 3, 7, or 9, you get (98 × 2) = 196</li>
                  <li>If the result shows 5, you get (98 × 1.5) = 147</li>
                </ul>
              </li>
              <li>
                Select <strong>red</strong>:
                <ul>
                  <li>If the result shows 2, 4, 6, or 8, you get (98 × 2) = 196</li>
                  <li>If the result shows 0, you get (98 × 1.5) = 147</li>
                </ul>
              </li>
              <li>
                Select <strong>violet</strong>:
                <ul>
                  <li>If the result shows 0 or 5, you get (98 × 4.5) = 441</li>
                </ul>
              </li>
              <li>
                Select a specific <strong>number</strong>:
                <ul>
                  <li>If the result matches the number you selected, you get (98 × 9) = 882</li>
                </ul>
              </li>
              <li>
                Select <strong>big</strong>:
                <ul>
                  <li>If the result shows 5, 6, 7, 8, or 9, you get (98 × 2) = 196</li>
                </ul>
              </li>
              <li>
                Select <strong>small</strong>:
                <ul>
                  <li>If the result shows 0, 1, 2, 3, or 4, you get (98 × 2) = 196</li>
                </ul>
              </li>
            </ol>
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

export default RulesModal;
