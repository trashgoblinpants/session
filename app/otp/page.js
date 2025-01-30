"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const VerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationPageContents />
    </Suspense>
  );
};

const VerificationPageContents = () => {
  const [otpCode, setOtpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const searchParams = useSearchParams();
  const number = searchParams.get("id");
  // setPhoneNumber(number);
  const hash = searchParams.get("hash");

  useEffect(() => {
    // Call handleOtpVerification when otpCode is exactly 6 digits
    if (otpCode && otpCode.length === 5 && /^\d{6}$/.test(otpCode)) {
      handleOtpVerification();
    }
  }, [otpCode]);

  const handleOtpVerification = async () => {
    if (!otpCode) {
      alert("Please enter the OTP code");
      return;
    }

    const storedEmail = localStorage.getItem("email");

    const apiUrl = `/api/verify-otp?phoneNumber=${number}&otp=${otpCode}&hash=${hash}&e=${storedEmail}`; // Replace with your actual OTP verification endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ otpCode }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Phone number verified successfully!");
        // Redirect or perform other actions after successful verification
      } else {
        alert("Invalid OTP code. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-center p-8 rounded-xl shadow-lg w-80">
        <img
          src="/monkey.png"
          alt="Monkey Emoji"
          className="w-20 h-20 mx-auto mb-4"
        />
        <p className="text-white font-bold text-lg mb-2">
          +{number} &nbsp;
          <span className="text-gray-400 text-base cursor-pointer">
            &#9998;
          </span>
        </p>
        <p className="text-gray-400 text-sm mb-6">
          We've sent the code to the Telegram app on your other device.
        </p>
        <input
          type="number"
          placeholder="Enter OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          className="w-full px-4 py-2 text-center bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />

        <button onClick={handleOtpVerification}>Verify OTP</button>
      </div>
    </div>
  );
};

export default VerificationPage;
