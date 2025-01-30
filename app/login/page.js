"use client"


import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

const TelegramLogin = () => {
  const router = useRouter()

  const steps = [
    "Open Telegram on your phone", "Go to Settings > Devices > Link Desktop Device", "Point your phone at this screen to confirm login" 
  ]



  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
      <div className="min-h-screen flex flex-col items-center justify-center  text-white">

        <div className="flex flex-col md:flex-row gap-10 items-center">
      

          <div className="flex flex-col items-center">
          <div
        style={{
          borderRadius: "20px", 
          overflow: "hidden", 
          width: `${280 + 10 * 2}px`, 
          height: `${280 + 10 * 2}px`, 
          padding: `${10}px`, 
          backgroundColor: "#ffffff",
        }}
      >
        <QRCodeSVG
          value="https://telegram.org/"
          size={280}
          bgColor="#ffffff"
          includeMargin={false} 
          imageSettings={{
            src: "/telegram-icon.svg",
            x: undefined,
            y: undefined,
            height: 54,
            width: 54,
            excavate: true,
          }}
        />
      </div>

    
    <div className=""> 
      <h1 className="mt-6 mb-4 text-center text-2xl">
        Log in to Telegram by QR Code
      </h1>

      <div className="space-y-4 mb-4 px-7">
        {steps.map((step, index)=> (
          <div className="flex gap-3" key={index}> 
            <p className="bg-[#8774e1] w-[22px] aspect-square rounded-full text-center">{index + 1}</p>
            <p>{step}</p>
          </div>

        ))}
      </div>

    
    </div>

      <button type="button" className="Button default primary text" onClick={()=> router.push("/number")}>Log in by phone Number</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramLogin;
