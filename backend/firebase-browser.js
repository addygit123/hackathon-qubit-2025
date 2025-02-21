import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5l1iX-0cpztFDN4QDsRLcL_MInL-EfqE",
  authDomain: "qubit-951c9.firebaseapp.com",
  projectId: "qubit-951c9",
  storageBucket: "qubit-951c9.appspot.com",
  messagingSenderId: "925345673096",
  appId: "1:925345673096:web:e25b607127db9e9812d43d",
  measurementId: "G-RZDJKP6TX1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Only use this in the browser environment
const db = getFirestore(app);

export { db, analytics };
