// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAgXkisikvzI0tB6LaCQ1OCa5hW2bI-aeA",
  authDomain: "tempest---chat.firebaseapp.com",
  projectId: "tempest---chat",
  storageBucket: "tempest---chat.appspot.com",
  messagingSenderId: "222389023300",
  appId: "1:222389023300:web:5d13b2a1ab4c255d2c0211"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);