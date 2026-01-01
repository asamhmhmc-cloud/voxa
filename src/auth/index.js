// Voxa - Firebase Phone Authentication Logic
// Test Mode Ready

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";

/**
 * 1️⃣ إعداد Firebase
 * ⚠️ لاحقًا ستستبدل القيم ببياناتك الحقيقية
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * 2️⃣ تفعيل reCAPTCHA (وضع الاختبار)
 */
export function initRecaptcha(containerId = "recaptcha-container") {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      { size: "invisible" },
      auth
    );
  }
}

/**
 * 3️⃣ إرسال رمز التحقق (OTP)
 */
export async function sendOTP(phoneNumber) {
  if (!window.recaptchaVerifier) {
    throw new Error("reCAPTCHA غير مفعّل");
  }

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    window.recaptchaVerifier
  );

  window.confirmationResult = confirmationResult;
  return true;
}

/**
 * 4️⃣ تأكيد رمز OTP
 */
export async function verifyOTP(code) {
  if (!window.confirmationResult) {
    throw new Error("لم يتم إرسال رمز التحقق");
  }

  const result = await window.confirmationResult.confirm(code);
  return result.user;
}
