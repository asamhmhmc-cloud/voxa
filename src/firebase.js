// Firebase core
import { initializeApp } from "firebase/app";

// Firebase Auth
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7ZRbCx8hWWS04OX2Kd8uR2aS5Qf0QyUo",
  authDomain: "voxa-9eccf.firebaseapp.com",
  projectId: "voxa-9eccf",
  storageBucket: "voxa-9eccf.firebasestorage.app",
  messagingSenderId: "383003599696",
  appId: "1:383003599696:web:4c092abe995511f6594255",
};

const app = initializeApp(firebaseConfig);

// 🔐 التصدير المهم
export const auth = getAuth(app);
