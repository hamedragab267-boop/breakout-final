import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAubjKdiEqfDpW-tc94-l-AI7lbPs7IU04",
  authDomain: "breakout-d5088.firebaseapp.com",
  projectId: "breakout-d5088",
  storageBucket: "breakout-d5088.appspot.com",
  messagingSenderId: "57071720148",
  appId: "1:57071720148:web:1a628bbb31191d11efcd41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
