"use client";
import EnterButton from "@/assets/enterButton.svg";
import EnterButtonComp from "@/assets/enterButtonComp.svg";
import OnboardMobile from "@/assets/signinpage.png";
import OnboardMobileBg from "@/assets/onboardMobileBg.svg";
import { useGlobalContext } from "@/context/globalContext";
import { GoogleLogin } from "@react-oauth/google";
import GlobalLoader from "@/components/GlobalLoader";
import Link from "next/link";
import poster from "@/assets/damangameposter.webp"

export default function Home() {
  const { isMobile, isLoading, signInUser }: any =
    useGlobalContext();
  if (isMobile === null) return <></>;
  return (
    <main className="w-full overflow-hidden px-[20px] sm:px-[30px] md:px-[100px]" style={{ fontFamily: "Overpass, sans-serif" }}>
      {isLoading ? <GlobalLoader /> : <></>}
      <div className="flex items-center justify-center gap-4 mt-3">
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
            className="opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px] py-2 px-4 bg-red-600 text-white fony-bold rouded-md"
          >
            Login
          </button>
        </div>
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
            className="opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px] py-2 px-4 bg-red-600 text-white fony-bold rouded-md"
          >
            Register
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <h1 className="text-black font-bold text-[28px] sm:text-[36px]">Dhaman Game Login</h1>
        <Link href="/"><p className="text-[blue] hover:underline">Home</p></Link>
      </div>

      <hr />
      <p className="mt-[80px] text-[25px]">Login to play game.</p>
      <div className="flex justify-center">
        <img src={poster.src} alt="" className="w-[300px] mt-[80px]" />
      </div>
      <p className="mt-[60px]">If you often play the colour prediction game, you might need a legit and fair gaming app to play the colour prediction game. That’s why the most obvious choice to play the colour prediction game would be the Dhaman Game app. </p>

      <p className="mt-[60px]">Customer Support – <Link href="https://t.me/+LalkJoWu4FhmYThl" className="text-blue-500">https://t.me/+LalkJoWu4FhmYThl</Link></p>

      <p className="mt-[60px]">The Dhaman Game is the best colour prediction app where you can play the colour prediction game in 1 minute, 3 minutes, 5 minutes and 10 minutes. The Dhaman Game app also gives a win streak and rebate bonus for their colour prediction game.</p>
      <div className="bg-gray-200 p-4 py-[60px] mt-[70px]">
        <p>Copyright @2025 Dhaman Game Login</p>
      </div>
    </main>
  );
}
