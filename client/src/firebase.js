// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "mern-shophybook-32985.firebaseapp.com",
  projectId: "mern-shophybook-32985",
  storageBucket: "mern-shophybook-32985.appspot.com",
  messagingSenderId: "241782349510",
  appId: "1:241782349510:web:a1acd218e8fb817c9901c7"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 export default app;