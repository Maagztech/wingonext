import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Success from "@/assets/Success.svg";
import Collect from "@/assets/collect.svg";
import Noreward from "@/assets/loss.jpg";

const ScoreModal = ({ visible, setvisible, winValue }: any) => {
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
      height: "310px",
      width: "300px",
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
      className={`Modal overflow-hidden text-black flex flex-col items-center px-[17px] pb-[36px] rounded-[15px] ${!imagesLoaded.success || !imagesLoaded.noreward ? "hidden" : "successBg"
        }`}
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <h1 className="text-center font-bold my-2 text-lg">Result</h1>
      <div className="flex items-center justify-around w-full">
        <p className="text-lg">small</p>
        <p className="text-lg">1</p>
        <p className="text-lg">Red Green</p>
      </div>
      {winValue >= 0 ? (
        <>
          {imagesLoaded.success && (
            <img src={Success.src} alt="Success" className="mt-[-46px] h-[240px]" />
          )}
          <p className="font-bold text-[20px] leading-[25px] mt-[-16px]">
            You Won {winValue} Rupees!
          </p>
        </>
      ) : (
        imagesLoaded.noreward && (
          <>
            <img
              src={Noreward.src}
              alt="No Reward"
              className="mt-2"
            />
            <p className="font-bold text-[20px] leading-[25px] mx-[30] my-2">
              Better luck next time!
            </p>
          </>
        )
      )}
      <div className="flex items-center justify-around w-full">
        <p className="text-lg">Type:</p>
        <p className="text-lg">Period:</p>
      </div>
    </Modal>
  );
};

export default ScoreModal;
