import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvxMM53sTKO0Zky2_C75YHrTn07U7AwX4",
  authDomain: "red-love-95f03.firebaseapp.com",
  projectId: "red-love-95f03",
  storageBucket: "red-love-95f03.firebasestorage.app",
  messagingSenderId: "292635066248",
  appId: "1:292635066248:web:7485ef37074244e181443d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
