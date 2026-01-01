import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

let confirmationResult = null;

// 🔐 تهيئة reCAPTCHA
export function initRecaptcha() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "normal" },
      auth
    );
  }
}

// 📲 إرسال كود التحقق
export async function sendOTP(phoneNumber) {
  initRecaptcha();

  const appVerifier = window.recaptchaVerifier;

  confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  return true;
}
