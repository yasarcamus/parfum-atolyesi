// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (Bu kısım senin kopyaladığın doğru kod)
const firebaseConfig = {
  apiKey: "AIzaSyDSn-DFdscgku5cADf8q3lnqQfi2dZgOMg",
  authDomain: "parfum-atolyesi.firebaseapp.com",
  projectId: "parfum-atolyesi",
  storageBucket: "parfum-atolyesi.firebasestorage.app",
  messagingSenderId: "461166605670",
  appId: "1:461166605670:web:84e0be5e1c1dad9f03c4a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so other parts of the app can use them
export const auth = getAuth(app);
export const db = getFirestore(app);