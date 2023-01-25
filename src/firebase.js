// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAYN8aYPRChegbuvrB9EIzikoiu6L_UL-M",
  authDomain: "disneyplus-clone-70347.firebaseapp.com",
  databaseURL:
    "https://disneyplus-clone-70347-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "disneyplus-clone-70347",
  storageBucket: "disneyplus-clone-70347.appspot.com",
  messagingSenderId: "478725210371",
  appId: "1:478725210371:web:3f6a08ced8373639056936",
  measurementId: "G-4LL0V5WYZM",
};

// Initialize Firebase
// const firebaseApp =firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// const db = getFirestore(firebaseApp);
const db = getDatabase(firebaseApp);

const auth = getAuth();
// Authentication with google account :
const provider = new GoogleAuthProvider();
// const storage = storageOrigin();

export { auth, provider };
export default db;

//   const analytics = getAnalytics(app);
