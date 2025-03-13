"use client";

import React, { useState, useEffect } from "react";

const FormRegister = () => {
  const [homecarreNo, setHomecarreNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimeout, setOtpTimeout] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const round = "w-full px-3 py-2 border rounded-full";



  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpTimeout(true);
    const expireTime = Date.now() + 20000;
    setTimeLeft(20);

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((expireTime - Date.now()) / 1000)
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        setOtpTimeout(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen px-10 rounded-t-fig">
      <div className="mb-4 w-full">
        <label className={`block text-gray-700 text-xl font-bold mb-2`}>
          HomeCarre No.
        </label>
        <input
          type="text"
          value={homecarreNo}
          onChange={(e) => setHomecarreNo(e.target.value)}
          className={`${round}`}
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-xl font-bold mb-2">
          Phone Number
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`${round}`}
        />
      </div>
      <span className={otpSent ? "visible" : "hidden"}> send again in</span>
      <button
        onClick={handleSendOtp}
        disabled={otpTimeout}
        className={`w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
          otpTimeout ? "bg-gray-500 opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {otpTimeout ? `${timeLeft}s` : "Send OTP"}
      </button>
      {otpSent && (
        <div className="mt-4 w-full">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`${round}`}
          />
        </div>
      )}
      {otpSent && (
        <button className="w-1/2 bg-green-500 text-white font-bold py-2 px-4 rounded-full mt-4">
          Register
        </button>
      )}
    </div>
  );
};

export default FormRegister;
