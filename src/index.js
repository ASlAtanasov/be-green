import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzFJpEyukhF5i9lVtKR3vExLeUm-fwVqw",
//   authDomain: "be-green-163a0.firebaseapp.com",
//   projectId: "be-green-163a0",
//   storageBucket: "be-green-163a0.appspot.com",
//   messagingSenderId: "6015756216",
//   appId: "1:6015756216:web:6616dbb239c817ea7b914d",
//   measurementId: "G-2F9N3QTKVB"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase();
// const reference = ref(db, 'users/', + userId);
// setImmediate(reference, {
//   username: name,
//   email: email,
// });

// writeUserData("ivo", "ivo@abv.bg");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals();
