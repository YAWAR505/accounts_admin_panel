// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAmUjDW-GQfY7_whyC-XMmKLyMpbMqhB7w",
  authDomain: "admin-panel-a3f1f.firebaseapp.com",
  projectId: "admin-panel-a3f1f",
  storageBucket: "admin-panel-a3f1f.appspot.com",
  messagingSenderId: "205858253795",
  appId: "1:205858253795:web:cb44ec5e8e988d7c438ed6",
  measurementId: "G-9YWRR8L8CC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
