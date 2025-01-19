import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Success from "@/assets/Success.svg";
import Collect from "@/assets/collect.svg";
import Noreward from "@/assets/noreward.svg";

const ScoreModal = ({ visible, setvisible, winValue }: any) => {
  const [imagesLoaded, setImagesLoaded] = useState({
    success: false,
    noreward: false
  });

  useEffect(() => {
    const loadImage = (src: string, key: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [key]: true }));
          resolve();
        };
      });
    };

    Promise.all([
      loadImage(Success.src, 'success'),
      loadImage(Noreward.src, 'noreward')
    ]).then(() => {
      // Optionally handle when all images are loaded
    });
  }, []);

  const customStylesModal = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "374px",
      width: "327px",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      backgroundColor: "white",
      fontFamily: "Oxanium",
    },
    overlay: { zIndex: 1000 },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className={`Modal overflow-hidden flex flex-col items-center px-[17px] pb-[36px] rounded-[15px] ${!imagesLoaded.success || !imagesLoaded.noreward ? "hidden" : "successBg"
        }`}
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      {winValue > 0 ? (
        <>
          {imagesLoaded.success && (
            <img src={Success.src} alt="Success" />
          )}
          <p className="font-bold text-[20px] leading-[25px] mt-[-12px] mb-[19px]">
            You Won {winValue} Coins!
          </p>
          <button
            onClick={async () => {
              setvisible(false);
            }}
            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
          >
            <img src={Collect.src} alt="Collect" />
          </button>
        </>
      ) : (
        imagesLoaded.noreward && (
          <>
            <img
              src={Noreward.src}
              alt="No Reward"
              className="mb-[67px] mt-[83px]"
            />
            <p className="font-bold text-[16px] leading-[20px]">
              You Lose!
            </p>
            <p className="font-bold text-[20px] leading-[25px] mt-[12px] mx-[30]">
              Better luck next time!
            </p>
          </>
        )
      )}
    </Modal>
  );
};

export default ScoreModal;
