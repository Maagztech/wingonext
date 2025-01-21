"use client";
import EnterButton from "@/assets/enterButton.svg";
import EnterButtonComp from "@/assets/enterButtonComp.svg";
import OnboardMobile from "@/assets/signinpage.png";
import OnboardMobileBg from "@/assets/onboardMobileBg.svg";
import { useGlobalContext } from "@/context/globalContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  const { isMobile, loading, signInUser }: any =
    useGlobalContext();
  if (isMobile === null || loading) return <></>;
  return (
    <main className="h-[100vh] w-full overflow-hidden">
      {isMobile ? (
        <div className="w-full h-full flex flex-col fixed">
          <div className="flex-grow">
            <img src={OnboardMobile.src} alt="" className="w-full mt-[100px]" />
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={OnboardMobileBg.src}
              alt=""
              className="w-full absolute z-0 bottom-0"
            />
            <p
              style={{ fontFamily: "Overpass, sans-serif" }}
              className="font-medium text-[32px] leading-[38.4px] z-20 mt-[62.65px]"
            >
              Win Go
            </p>
            <div className="relative h-[42px] w-[311px] mt-[28px] mb-[35px] flex justify-center">
              <div
                style={{ zIndex: 3 }}
                className="opacity-0 absolute top-0 right-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out "
              >
                <GoogleLogin
                  width="400px"
                  onSuccess={(credentialResponse) => {
                    signInUser(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{ zIndex: 1 }}
                className="opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px]"
              >
                <img src={EnterButton.src} alt="" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <img
            src={OnboardMobile.src}
            alt=""
            className="w-[376px] mb-[50.78px]"
          />
          <p
            style={{ fontFamily: "Overpass, sans-serif" }}
            className="font-medium text-[56px] leading-[67.2px] mb-[66.47px]"
          >
            Win Go
          </p>
          <div className="relative h-[42px] w-[311px] mb-[70px] mx-[44.5px]">
            <div
              style={{ zIndex: 3 }}
              className="opacity-0 absolute top-0 right-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              <GoogleLogin
                width="300px"
                onSuccess={(credentialResponse) => {
                  signInUser(credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              style={{ zIndex: 1 }}
              className="opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px]"
            >
              <img
                src={EnterButtonComp.src}
                alt=""
                className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
              />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
