import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCzFJpEyukhF5i9lVtKR3vExLeUm-fwVqw",
  authDomain: "be-green-163a0.firebaseapp.com",
  databaseURL: "https://be-green-163a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "be-green-163a0",
  storageBucket: "be-green-163a0.appspot.com",
  messagingSenderId: "6015756216",
  appId: "1:6015756216:web:6616dbb239c817ea7b914d",
  measurementId: "G-2F9N3QTKVB"
};

export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const database = getDatabase();
export const storage = getStorage(app);