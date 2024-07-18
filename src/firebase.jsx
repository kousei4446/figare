// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage, analytics };