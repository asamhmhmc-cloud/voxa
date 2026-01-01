import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

let confirmationResult;

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
export function sendOTP(phoneNumber) {
  initRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((result) => {
      confirmationResult = result;
      return true;
    });
}

// ✅ تأكيد الكود
export function verifyOTP(code) {
  return confirmationResult.confirm(code);
}
