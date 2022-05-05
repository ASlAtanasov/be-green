import { initializeApp, registerVersion } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

//your web app's Firebase congiguration
const firebaseConfig = {
  apiKey: "AIzaSyCzFJpEyukhF5i9lVtKR3vExLeUm-fwVqw",
  authDomain: "be-green-163a0.firebaseapp.com",
  projectId: "be-green-163a0",
  storageBucket: "be-green-163a0.appspot.com",
  messagingSenderId: "6015756216",
  appId: "1:6015756216:web:6616dbb239c817ea7b914d",
  measurementId: "G-2F9N3QTKVB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
};