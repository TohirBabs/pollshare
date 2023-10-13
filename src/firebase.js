// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwbcjKKv6rKpBFYh4PdQppy6nyJyaUpAY",
  authDomain: "pollshare.firebaseapp.com",
  projectId: "pollshare",
  storageBucket: "pollshare.appspot.com",
  messagingSenderId: "292209312605",
  appId: "1:292209312605:web:ca8ffbed72ba37dbe01eb4",
  measurementId: "G-NS7BX2HJEZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
