import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase config values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAKioIlcJTtE_EgK_GI97pYYnogxtjooGE",
  authDomain: "happy-monday-f55dc.firebaseapp.com",
  projectId: "happy-monday-f55dc",
  storageBucket: "happy-monday-f55dc.firebasestorage.app",
  messagingSenderId: "1073020785319",
  appId: "1:1073020785319:web:4c0ebe1a39f979b6af8182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
