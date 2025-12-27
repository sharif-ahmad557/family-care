import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXbNVkS51U7v_rx35H5F3erq3U6pWXxFM",
  authDomain: "family-care-9a814.firebaseapp.com",
  projectId: "family-care-9a814",
  storageBucket: "family-care-9a814.firebasestorage.app",
  messagingSenderId: "223995266970",
  appId: "1:223995266970:web:0330fa6996570c6cb71c23",
};

// অ্যাপ ইনিশিয়ালাইজ করা (যাতে বারবার ইনিশিয়ালাইজ না হয় - Singleton Pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// অথেন্টিকেশন এবং গুগল প্রোভাইডার এক্সপোর্ট করা
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
