// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore'
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Ovdje ubacite svoj config
const firebaseConfig = {
  apiKey: "AIzaSyAxLQOIeUAnBSBBIooNS1H1gwjRfgGWhIo",
  authDomain: "sweetmeet-ccdad.firebaseapp.com",
  projectId: "sweetmeet-ccdad",
  storageBucket: "sweetmeet-ccdad.appspot.com",
  messagingSenderId: "753865001621",
  appId: "1:753865001621:web:21367552388e7646b0a99c",
  measurementId: "G-87Z59SXLNF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage,
  getAuth,
	db,
  doc,
  getDoc,
	setDoc,
  addDoc,
createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword

}

