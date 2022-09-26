// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUnhNh2fR-sHC4hnq40f9dTA6RDYFVtbM",
  authDomain: "service-tickets-app.firebaseapp.com",
  projectId: "service-tickets-app",
  storageBucket: "service-tickets-app.appspot.com",
  messagingSenderId: "992146970165",
  appId: "1:992146970165:web:07b41f63d3c89213c0037c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth =  getAuth(app)
export const ticketsCollection =  collection(db, 'Tickets')
export const usersCollection =  collection(db, 'Users')