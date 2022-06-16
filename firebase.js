import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNb3PeHUZ7A6Robrbyqsy-KwZ4pI8MVT4",
  authDomain: "footballvideogenerator.firebaseapp.com",
  projectId: "footballvideogenerator",
  storageBucket: "footballvideogenerator.appspot.com",
  messagingSenderId: "232757240686",
  appId: "1:232757240686:web:5ef4dd78cd8db887ec577f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
