import { initRecaptcha, sendOTP } from "./src/المصادقة/index.js";

// مثال تجريبي
initRecaptcha("recaptcha-container");

sendOTP("+201234567890")
  .then(result => {
    console.log("OTP sent", result);
  })
  .catch(err => {
    console.error(err);
  });
