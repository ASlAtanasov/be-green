import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { child, getDatabase, onChildAdded, onChildChanged, onValue, ref, set } from "firebase/database";
//import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

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

// post data in firebase
// function writeUserData(userId, name, email) {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + userId);

//   set(reference, {
//     username: name,
//     email: email,
//   });
// }

//get data from firebase
// const db = getDatabase();
// const distanceRef = ref(db, 'users/' + userId + '/distance');
// onValue(distanceRef, (snapshot) => {
//   const data = snapshot.val();
//   updateDistance(postElement, data);
// })


//push data in firebase
// const db = getDatabase();
// const postListRef = ref(db, 'post-comments/' + postId);
// const newPostRef = push(postListRef);
// set(NewPostRef, {
//   //...
// });

//take all data from reference
// const commentsRef = ref(db, 'post-comments/' + postId);
// onValue(commentsRef, (snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     const childKey = childSnapshot.key;
//     const childData = childSnapshot.val();
//   })
// },
//   {
//     onlyOnce: true
//   });

// // take comment when added 
// const commentsRef = ref(db, 'post-comments/' + postId);
// onChildAdded(commentsRef, (data) => {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });

// // take comment when /children/ change
// onChildChanged(commentsRef, (data) => {
//   setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });



// //use storage for images, videos, filees
// const storage = getStorage();
// const storageRef = ref(storage);

// const imagesRef = ref(stotage, 'images');
// const sparkyRef = ref(storage, 'images/sparky.jpg');

// //'file' comes from the Blob or Frle API
// uploadBytes(sparkyRef, file).then((snapshot) => {
//   console.log('Úploaded a blob or file');
// });

// const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21])
// uploadBytes(sparkyRef, file).then((snapshot) => {
//   console.log('Úploaded an array');
// })

// //Raw string is the default if no format is provided
// const rawString = 'This is my message.';
// uploadString(spartyRef, raw_string).then((snapshot) => {
//   console.log('Uploaded a raw string');
// });

// uploadBytes();
// uploadString();

//writeUserData("ivo", "ivo@abv.bg");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
