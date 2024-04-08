import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6eIr3O5ps43tlSter0V0Zb24ziKgaxI8",
    authDomain: "travelers-journal-32ae2.firebaseapp.com",
    projectId: "travelers-journal-32ae2",
    storageBucket: "travelers-journal-32ae2.appspot.com",
    messagingSenderId: "966946228033",
    appId: "1:966946228033:web:d4d2078d7a40b3a05d03c0",
    measurementId: "G-JSZETQKQSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;