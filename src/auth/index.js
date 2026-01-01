// ===============================
// 🔐 Authentication - Voxa
// ===============================

// OTP + reCAPTCHA
import { initRecaptcha, sendOTP } from "./phoneAuth";

// Firebase Auth
import { auth } from "../firebase";
import {
  signInWithCredential,
  PhoneAuthProvider
} from "firebase/auth";

// Firestore
import { db } from "../firestore";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

// -------------------------------
let confirmationResult = null;

// تفعيل reCAPTCHA
window.addEventListener("load", () => {
  initRecaptcha("recaptcha-container");
});

// إرسال رمز التحقق
document.getElementById("sendCode")?.addEventListener("click", async () => {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("أدخل رقم الهاتف");
    return;
  }

  try {
    confirmationResult = await sendOTP(phone);
    alert("تم إرسال الرمز ✅");
  } catch (e) {
    console.error(e);
    alert("خطأ في إرسال الرمز");
  }
});

// تأكيد الرمز
document.getElementById("verifyCode")?.addEventListener("click", async () => {
  const code = document.getElementById("code").value;

  if (!confirmationResult || !code) {
    alert("أدخل رمز التحقق");
    return;
  }

  try {
    const credential = PhoneAuthProvider.credential(
      confirmationResult.verificationId,
      code
    );

    const result = await signInWithCredential(auth, credential);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        phone: user.phoneNumber,
        createdAt: new Date()
      });
    }

    alert("تم تسجيل الدخول بنجاح 🎉");
  } catch (e) {
    console.error(e);
    alert("رمز غير صحيح");
  }
});
