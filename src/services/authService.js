import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app, auth, database } from '../firebase';
import { set, ref as databaseRef, onValue } from "firebase/database";

export const login = async (email, password, setUser, orderedProducts, navigate) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    console.log('response in login authService: ' + JSON.stringify(response));
    

    let userUid = JSON.stringify(response.user.uid)
    console.log('userUid in login authService: ' + userUid);

    onValue(databaseRef(database, 'users/' + response.user.uid), (snapshot) => {
      const userData = snapshot.val();
      let userToSave = {...userData, uid: response.user.uid, email: response.user.email, accessToken: response.user.accessToken}
      
      localStorage.setItem('user', JSON.stringify(userToSave));

      setUser(userToSave);

      if (orderedProducts) {
        navigate('/cart')
      } else {
        navigate('/home');
      }      
    });    
  } catch (error) {
    alert(`${error.code}: ${error.message}`);
  }
};

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

export const register = async (email, password, firstName, lastName, country, city, address, postalCode, orderedProducts, navigate, setUser) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    
    let userToSave = '';

    if (response) {
      userToSave = { uid: response.user.uid, email, firstName, lastName, country, city, address, postalCode, accessToken: response.user.accessToken }
      saveUserData(userToSave.uid, firstName, lastName, country, city, address, postalCode)

      localStorage.setItem('user', JSON.stringify(userToSave));

      setUser(userToSave);
      if (orderedProducts) {
        navigate('/cart')
      } else {
        navigate('/home');
      };
    };

    return userToSave;
  } catch (error) {
    alert(`${error.code}: ${error.message}`);
  };
};

export function saveUserData(userId, firstName, lastName, country, city, address, postalCode) {
  set(databaseRef(database, 'users/' + userId), {
    firstName,
    lastName,
    country,
    city,
    address,
    postalCode
  });
};


