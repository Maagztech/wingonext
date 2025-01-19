"use client";
import React, { useState } from 'react';
import Wingo from "@/assets/wingo.png";
import Image from 'next/image';
import BalanceModal from './BalanceModal';

const NavBar = () => {
    const [balanceModal, setBalanaceModal] = useState(false);
    return (
        <div className="flex items-center flex-row bg-gradient-to-r from-red-500 to-white gap-2 h-[60px] justify-between">
            <div className="flex items-center gap-2">
                <Image src={Wingo} alt="Wingo" width={70} height={70} />
                <h1
                    style={{ fontFamily: "Overpass, sans-serif" }}
                    className="font-bold text-[32px] leading-[38.4px] z-20 text-white"
                >
                    Win Go
                </h1>
            </div>
            <div onClick={() => setBalanaceModal(true)} className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out mr-4 bg-violet-700 p-2 text-white rounded-bl-[15px] rounded-tr-[15px]">
                <p className="font-bold">Balance : ₹ 100</p>
            </div>
            <BalanceModal visible={balanceModal} setvisible={setBalanaceModal} />
        </div>
    );
};

export default NavBar;
