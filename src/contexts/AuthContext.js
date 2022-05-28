import React, { createContext, useContext, useState } from "react";
import { signUp, signIn, signOutPage } from '../services/authService';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

const initialState = null;

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();

    // const register = async (email, password) => {
    //     try {
    //         const response = await signUp(email, password);
    //         const userToSave = { email, accessToken: response.user.accessToken, uid: response.user.uid }
     
    //         return userToSave;
    //     } catch (error) {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;

    //         alert(`${errorCode}: ${errorMessage}`);
    //     }
    // }
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthUserContext = () => {
    return useContext(AuthContext);
}