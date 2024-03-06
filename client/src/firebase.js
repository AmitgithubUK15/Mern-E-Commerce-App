// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBSAE_API_KEY,
  authDomain: "mern-shophybook.firebaseapp.com",
  projectId: "mern-shophybook",
  storageBucket: "mern-shophybook.appspot.com",
  messagingSenderId: "338003403414",
  appId: "1:338003403414:web:faa25cef53a34fc09258b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);