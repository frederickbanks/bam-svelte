// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getDatabase, ref, onValue, get} from 'firebase/database'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl-MooRuwSjioIQQtRlxpirvTXNSk6bis",
  authDomain: "bam-tech-innovation.firebaseapp.com",
  projectId: "bam-tech-innovation",
  storageBucket: "bam-tech-innovation.appspot.com",
  messagingSenderId: "682291508064",
  appId: "1:682291508064:web:f488cc1eca547b96366405",
  measurementId: "G-VNSGNY3PCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






export {app}