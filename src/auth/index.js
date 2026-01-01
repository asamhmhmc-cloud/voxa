import { initRecaptcha, sendOTP } from "./phoneAuth";
import { auth } from "../firebase";
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";

let confirmationResult = null;

// تفعيل reCAPTCHA
initRecaptcha("recaptcha-container");

// إرسال الكود
document.getElementById("sendCode").onclick = async () => {
  const phone = document.getElementById("phone").value;

  try {
    confirmationResult = await sendOTP(phone);
    alert("تم إرسال رمز التحقق");
  } catch (err) {
    alert(err.message);
  }
};

// تأكيد الكود
document.getElementById("verifyCode").onclick = async () => {
  const code = document.getElementById("otp").value;

  try {
    const result = await confirmationResult.confirm(code);
    console.log("تم تسجيل الدخول:", result.user);
    alert("تم تسجيل الدخول بنجاح ✅");
  } catch (err) {
    alert("رمز غير صحيح ❌");
  }
};
