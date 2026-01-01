import { useState, useEffect } from "react";
import { sendOTP } from "../auth/phoneAuth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!phone.startsWith("+")) {
      alert("❌ اكتب الرقم مع رمز الدولة مثل +967");
      return;
    }

    try {
      setLoading(true);
      await sendOTP(phone);
      alert("✅ تم إرسال كود التحقق");
    } catch (error) {
      console.error(error);
      alert("❌ فشل إرسال الكود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 تسجيل الدخول</h2>

        <input
          type="tel"
          placeholder="+967XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "جاري الإرسال..." : "إرسال الكود"}
        </button>

        {/* ⚠️ مهم جدًا */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
