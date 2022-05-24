// import { initializeApp } from "firebase/app";
// //import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from "firebase/database";
// import {getStorage} from 'firebase/storage';
import { app, auth, database } from '../firebase';
import { useNavigate } from 'react-router';



// const firebaseConfig = {
//   apiKey: "AIzaSyCzFJpEyukhF5i9lVtKR3vExLeUm-fwVqw",
//   authDomain: "be-green-163a0.firebaseapp.com",
//   databaseURL: "https://be-green-163a0-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "be-green-163a0",
//   storageBucket: "be-green-163a0.appspot.com",
//   messagingSenderId: "6015756216",
//   appId: "1:6015756216:web:6616dbb239c817ea7b914d",
//   measurementId: "G-2F9N3QTKVB"
// };

// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);

// export const auth = getAuth();
// export const database = getDatabase();
// export const storage = getStorage(app);

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
};

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const login = async (email, password, setUser) => {
  try {
    const response = await signIn(email, password);
    console.log('response from Firebase: ' + response);

    const userToSave = { email, accessToken: response.user.accessToken, uid: response.user.uid };
    
    console.log(typeof userToSave);
    
    console.log('User id: ' + userToSave.uid);
    console.log(typeof userToSave.uid);
    console.log('User email: ' + userToSave.email);
    console.log(typeof userToSave.email);
    console.log('User accessToken: ' + userToSave.accessToken);
    console.log(typeof userToSave.accessToken);

    await setUser(userToSave);
    console.log('setUser in context: ' + JSON.stringify(userToSave));

    localStorage.setItem('user', JSON.stringify(userToSave));
    console.log('localStorage set user: ' + JSON.stringify(userToSave));


    return userToSave;
  } catch (error) {
    alert(error.message);
  }
};

// export function signOutPage() {
//   return signOut(auth);
// }

export const logout = (setUser, navigate, initialState) => {
  signOut(auth)
      .then(() => {
          localStorage.removeItem('user');
          
          navigate('/');
          //return <Navigate to='home' />;
         setUser(initialState);
          alert('You signed out successfully');
      })
      .catch((error) => {
          alert(error.message)
      });
}

export function saveUserData(userId, country, city, address, postalCode) {
  set(ref(database, 'users/' + userId), {
    country,
    city,
    address,
    postalCode
  });
}


