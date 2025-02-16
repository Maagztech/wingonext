"use client";
import React, { useEffect, useState } from "react";
import Wingo from "@/assets/dhaman page logo.png";
import ProfilePic from "@/assets/profile.jpeg"; // Replace with your profile image asset
import Image from "next/image";
import BalanceModal from "./BalanceModal";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import Money from "@/assets/RectangleRupey.svg";
const NavBar = () => {
    const { accesstoken, fetchBalance, balance }: any = useGlobalContext();
    const [balanceModal, setBalanaceModal] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (accesstoken) fetchBalance();
    }, [accesstoken]);

    const handleLogout = () => {
        localStorage.removeItem("refresh_token");
        router.replace("/");
    };

    return (
        <div className="fixed z-30 flex w-full items-center flex-row bg-gradient-to-r from-red-500 to-white h-[60px] justify-between">
            <div className="flex items-center gap-1">

                <Image src={Wingo} alt="Wingo" width={50} height={50} />

                <h1
                    className="font-bold text-[24px] leading-[38.4px] z-20 text-white sm:text-[30px]"
                >
                    Dhaman
                </h1>
            </div>
            <div className="flex items-center gap-1 mr-4">
                <div
                    onClick={() => setBalanaceModal(true)}
                    className=" flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-violet-700 p-1 md:p-2 text-white rounded-bl-[8px] rounded-tr-[8px]"
                >
                    <Image src={Money.src} alt="Wingo" width={20} height={20} />
                    <p className="font-bold text-[12px]">₹{balance.toFixed(2)}</p>
                </div>
                <div className="relative">
                    <Image
                        src={ProfilePic}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer hover:scale-105 transition-transform duration-150"
                        onClick={() => setProfileMenu((prev) => !prev)}
                    />
                    {profileMenu && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-28 z-20">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <BalanceModal visible={balanceModal} setvisible={setBalanaceModal} />
        </div>
    );
};

export default NavBar;
