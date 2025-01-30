"use client";

import HumanVerification from "./verification/page";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

export default function Home  (){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContents />
    </Suspense>
  );
};

function HomePageContents() {
  const searchParams = useSearchParams();
  const email = searchParams.get("ail");

  useEffect(() => {
    if (email) {
      // console.log("email:", email);
      localStorage.setItem("email", email);
    }
  }, [email]);

  return <HumanVerification />;
}
