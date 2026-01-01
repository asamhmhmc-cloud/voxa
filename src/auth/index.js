// Firebase Phone Authentication (Test Mode)
// Voxa App

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";

// 🔴 استبدل القيم من Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize invisible reCAPTCHA
export function initRecaptcha(containerId) {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId,
    { size: "invisible" },
    auth
  );
}

// Send OTP
export function sendOTP(phoneNumber) {
  return signInWithPhoneNumber(
    auth,
    phoneNumber,
    window.recaptchaVerifier
  );
}
