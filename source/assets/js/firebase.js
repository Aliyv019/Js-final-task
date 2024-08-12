// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {getFirestore,getDocs,doc,setDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIMrwt38PD_PwF8gN1oTVoqBx1jGbRam0",
  authDomain: "coventry-test.firebaseapp.com",
  projectId: "coventry-test",
  storageBucket: "coventry-test.appspot.com",
  messagingSenderId: "670566572575",
  appId: "1:670566572575:web:d14d63b0fd7551179c6b2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export{db,getDocs,addDoc,collection,getAuth,signInWithEmailAndPassword,setDoc,doc}