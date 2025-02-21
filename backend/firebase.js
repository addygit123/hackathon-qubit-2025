// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5l1iX-0cpztFDN4QDsRLcL_MInL-EfqE",
  authDomain: "qubit-951c9.firebaseapp.com",
  projectId: "qubit-951c9",
  storageBucket: "qubit-951c9.firebasestorage.app",
  messagingSenderId: "925345673096",
  appId: "1:925345673096:web:e25b607127db9e9812d43d",
  measurementId: "G-RZDJKP6TX1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const journeyId = collection(db, "journeyId");

export { db };
