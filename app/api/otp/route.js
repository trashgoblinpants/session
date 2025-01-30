"use server";

// import { getCode } from "@/utils/utils";
import { NextResponse } from "next/server";

import { getCode } from "../../../utils/utils";

/**
 * GET route handler to request a phone code.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phoneNumber");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Get the phone code hash
    const phoneCodeHash = await getCode(phone);
    console.log("phoneCodeHash: ", phoneCodeHash);

    return NextResponse.json(
      { phoneCodeHash: phoneCodeHash, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}