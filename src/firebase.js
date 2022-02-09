import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlVnY2Zkp0usoczncgonxIlcQ050RrUyY",
  authDomain: "blogit-15aca.firebaseapp.com",
  projectId: "blogit-15aca",
  storageBucket: "blogit-15aca.appspot.com",
  messagingSenderId: "278256116592",
  appId: "1:278256116592:web:0c2eeacfac153f3064e5b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);