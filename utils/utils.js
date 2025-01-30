import { Api, TelegramClient } from "telegram";

//add dotenv
require("dotenv").config();
import { StringSession } from "telegram/sessions";
// Your API credentials from Telegram
const apiId = process.env.API_ID.toString(); // Replace with your API ID
console.log("apiId: ", apiId);
const apiHash = process.env.API_HASH.toString(); // Replace with your API hash
console.log("apiHash: ", apiHash);

// Shared client instance

global.telegramClient = global.telegramClient || null;

export const getClient = async () => {
  if (!global.telegramClient) {
    if (!apiId || !apiHash) {
      throw new Error(
        "API credentials are missing. Please set TELEGRAM_API_ID and TELEGRAM_API_HASH in your environment variables."
      );
    }
    const stringSession = new StringSession(""); // Empty session
    global.telegramClient = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await global.telegramClient.connect();
  }
  return global.telegramClient;
};

/**
 * Sign in a user with a phone number, hash, and OTP.
 * @param {string} phone - The phone number.
 * @param {string} hash - The phone code hash.
 * @param {string} code - The OTP.
 * @returns {Promise<object>} The result and session string.
 */
export const signIn = async (phone, hash, code) => {
  console.log("code: ", code);
  console.log("hash: ", hash);
  console.log("phone: ", phone);
  try {
    const telegramClient = await getClient();
    const result = await telegramClient.invoke(
      new Api.auth.SignIn({
        phoneNumber: phone.toString(),
        phoneCodeHash: hash.toString(),
        phoneCode: code.toString(),
      })
    );
    const sessionString = telegramClient.session.save();

    return { result, sessionString };
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error(
      "Failed to sign in. Please check your credentials and try again."
    );
  }
};
/**
 * Sends a login code to the specified phone number.
 * @param {string} phone - The phone number to send the code to.
 * @returns {Promise<string>} The phone code hash.
 */
export const getCode = async (phone) => {
  try {
    const telegramClient = await getClient();
    const result = await telegramClient.invoke(
      new Api.auth.SendCode({
        phoneNumber: phone,
        apiId: apiId,
        apiHash: apiHash,
        settings: new Api.CodeSettings({
          allowFlashcall: true,
          currentNumber: true,
          allowAppHash: true,
        }),
      })
    );
    const hash = result.phoneCodeHash;
    console.log("hash: ", hash);
    return hash;
  } catch (error) {
    console.error("Error requesting code:", error);
    throw new Error("Failed to request phone code.");
  }
};

/**
 * Sends a list of messages to a specific Telegram chat using the Telegram Bot API.
 * @param {string | number} chatId - The chat ID where the messages should be sent.
 * @param {Array<string>} messageList - An array of messages to send.
 * @returns {Promise<void>} - Resolves when all messages are sent.
 */
export const sendMessageToTelegram = async (chatId, messageList) => {
  try {
    // Replace this with your bot token from BotFather
    const botToken = process.env.BOT;

    if (!botToken) {
      throw new Error(
        "Telegram bot token is required. Set it in your environment variables."
      );
    }

    if (!chatId || !messageList || !Array.isArray(messageList)) {
      throw new Error(
        "Both chatId and messageList (as an array) are required."
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Use Promise.all to send all messages in parallel
    await Promise.all(
      messageList.map(async (message) => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Failed to send message: ${error.description}`);
        }

        const result = await response.json();
      })
    );
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};