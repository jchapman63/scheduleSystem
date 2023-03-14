// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfLJ1O0a4QUpbOfhnBsVP4-BiYpvsi6rI",
  authDomain: "schedulesystem-6f9c7.firebaseapp.com",
  projectId: "schedulesystem-6f9c7",
  storageBucket: "schedulesystem-6f9c7.appspot.com",
  messagingSenderId: "738743838464",
  appId: "1:738743838464:web:496b086581443f5c8f35e5",
  measurementId: "G-ZFR4NXV92L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = app.auth();
export const database = app.database();