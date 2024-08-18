import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLOn0kN-rfSrrPOZXe0I_scgOQUoKQWi8",
  authDomain: "blog-ab2e3.firebaseapp.com",
  projectId: "blog-ab2e3",
  storageBucket: "blog-ab2e3.appspot.com",
  messagingSenderId: "238254513228",
  appId: "1:238254513228:web:483e1c4b7c7a619433a8e9",
  measurementId: "G-FN5V43YVD2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {
  app,
  analytics,
  auth,
  db,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
