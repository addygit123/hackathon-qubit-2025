import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB5l1iX-0cpztFDN4QDsRLcL_MInL-EfqE",
  authDomain: "qubit-951c9.firebaseapp.com",
  projectId: "qubit-951c9",
  storageBucket: "qubit-951c9.appspot.com",
  messagingSenderId: "925345673096",
  appId: "1:925345673096:web:e25b607127db9e9812d43d",
  measurementId: "G-RZDJKP6TX1",
};

// ✅ Prevent duplicate Firebase initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app); // ✅ Correctly initializing auth
const db = getFirestore(app);

export { app, auth, db }; // ✅ Correct exports
