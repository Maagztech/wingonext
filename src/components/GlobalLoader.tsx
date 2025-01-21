"use client";
import React from "react";

const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-bold text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;