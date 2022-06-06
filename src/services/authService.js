import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app, auth, database } from '../firebase';
import { set, ref as databaseRef, onValue } from "firebase/database";

export const login = async (email, password, setUser, orderedProducts, navigate) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
      
    onValue(databaseRef(database, 'users/' + response.user.uid), (snapshot) => {
      const userData = snapshot.val();
      let userToSave = { ...userData, uid: response.user.uid, email: response.user.email, accessToken: response.user.accessToken }

      localStorage.setItem('user', JSON.stringify(userToSave));

      setUser(userToSave);

      if (orderedProducts.length > 0) {
        navigate('/cart')
      } else {
        navigate('/home');
      };
    });
  } catch (error) {
    alert(`${error.code}: ${error.message}`);
  };
};

export const logout = (setUser, navigate, initialState) => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('orderedProducts');
      alert('Successful');
      navigate('/');
      setUser(initialState);
    })
    .catch((error) => {
      alert(error.message)
    });
};

export const register = async (email, password, firstName, lastName, phone, country, city, address, postalCode, orderedProducts, navigate, setUser) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    let userToSave = '';

    if (response) {
      userToSave = { uid: response.user.uid, email, firstName, lastName, phone, country, city, address, postalCode, accessToken: response.user.accessToken }
      saveUserData(userToSave.uid, firstName, lastName, phone, country, city, address, postalCode);
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

export function saveUserData(userId, firstName, lastName, phone, country, city, address, postalCode) {
  set(databaseRef(database, 'users/' + userId), {
    firstName,
    lastName,
    phone,
    country,
    city,
    address,
    postalCode
  });
};


