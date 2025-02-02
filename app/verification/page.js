"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HumanVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading.");
  const router = useRouter();

  const handleVerification = () => {
    setIsLoading(true);

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLoadingText(`Loading${".".repeat(counter % 4)}`);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      router.push("/number");
    }, 4000);
  };

  return (
    <main className="flex items-center justify-start flex-col gap-2 h-[100vh] p-4 text-center">
      <div className="mt-5">
        <p className="text-3xl font-bold text-telegram-text">
          Human Verification
        </p>
        <p className="text-md font-bold text-telegram-text mt-2">
          Verify below to be granted entry
        </p>
        <div className="flex items-center justify-center w-100 mt-3">
          <button
            id="human-safeguard"
            className="w-full px-3 py-3 my-4 font-mono text-base rounded text-telegram-button-text bg-gradient-to-r from-[#385446] via-[#366950] to-[#3c7659] hover:bg-gradient-to-br shadow-lg shadow-black-500/50 dark:shadow-lg dark:shadow-black-800/80"
            onClick={handleVerification}
          >
            {isLoading ? loadingText : "Click here"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default HumanVerification;
