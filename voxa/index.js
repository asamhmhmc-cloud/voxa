// Voxa App Core

import { initRecaptcha, sendOTP, verifyOTP } from "../المصادقة/index.js";

export function startApp() {
  console.log("Voxa App Started");

  initRecaptcha("recaptcha-container");
}

// إرسال كود
export async function loginWithPhone(phoneNumber) {
  await sendOTP(phoneNumber);
  console.log("OTP sent");
}

// تأكيد الكود
export async function confirmCode(code) {
  const user = await verifyOTP(code);
  console.log("User logged in:", user.phoneNumber);
  return user;
}
