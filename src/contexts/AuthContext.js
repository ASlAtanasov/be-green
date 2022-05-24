import React, { createContext, useContext, useState } from "react";
import { signUp, signIn, signOutPage } from '../services/authService';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

const initialState = null;

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();

    // const login = async (email, password) => {
    //     try {
    //         const response = await signIn(email, password);
    //         const userToSave = { email, accessToken: response.user.accessToken, uid: response.user.uid }

    //         localStorage.setItem('user', JSON.stringify(userToSave));
    //         setUser(userToSave);

    //         return userToSave;
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    const register = async (email, password) => {
        try {
            const ponse = await signUp(email, password);
            const userToSave = { email, accessToken: ponse.user.accessToken, uid: ponse.user.uid }

            localStorage.setItem('user', JSON.stringify(userToSave));

            setUser(userToSave);

            return userToSave;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(`${errorCode}: ${errorMessage}`);
        }
    }

    // const logout = () => {
    //     signOutPage()
    //         .then(() => {
    //             localStorage.removeItem('user');
                
    //             navigate('/');
    //             //return <Navigate to='home' />;
    //            setUser(initialState);
    //             alert('You signed out successfully');
    //         })
    //         .catch((error) => {
    //             alert(error.message)
    //         });
    //     console.log(user);
    // }

    return (
        <AuthContext.Provider value={{ user, setUser, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthUserContext = () => {
    return useContext(AuthContext);
}