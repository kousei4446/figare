// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAh5RRn6k0YzRii5SLEhcrGkPH9WQBiH0",
  authDomain: "figare.firebaseapp.com",
  projectId: "figare",
  storageBucket: "figare.appspot.com",
  messagingSenderId: "368398159069",
  appId: "1:368398159069:web:dcd4f825985a030f381f34",
  measurementId: "G-X2MS4VD01W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const storage=getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, storage, auth, provider, };