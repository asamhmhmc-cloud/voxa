import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

// تفعيل reCAPTCHA المخفي
export function initRecaptcha(containerId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      { size: "invisible" },
      auth
    );
  }
}

// إرسال كود التحقق
export function sendOTP(phoneNumber) {
  return signInWithPhoneNumber(
    auth,
    phoneNumber,
    window.recaptchaVerifier
  );
}
