// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeBE5xqu4e5XRGDabkjb5z9hvt2on788g",
  authDomain: "sweetmeet-da2a5.firebaseapp.com",
  projectId: "sweetmeet-da2a5",
  storageBucket: "sweetmeet-da2a5.appspot.com",
  messagingSenderId: "245500455151",
  appId: "1:245500455151:web:337ba5bd818087395a131a",
  measurementId: "G-70GGBJ4NVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = app.database();
export const namesRef = db.ref.database('names');