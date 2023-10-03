// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2bp6Hmlc-SuDrKe1SrUYCnv1IZPNlEjs",
  authDomain: "email-pass-auth-firebase-47a05.firebaseapp.com",
  projectId: "email-pass-auth-firebase-47a05",
  storageBucket: "email-pass-auth-firebase-47a05.appspot.com",
  messagingSenderId: "534333020481",
  appId: "1:534333020481:web:2e80b5af575939bfeda9c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export default app;
export default auth;
