import React from "react";
import { createContext, useContext, useState } from "react";
import { signUp, signIn } from '../services/authService';

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');

    const login = async (email, password) => {
        try {
            const response = await signIn(email, password);
            const userToSave = { email, accessToken: response.user.accessToken, uid: response.user.uid }

            localStorage.setItem('user', JSON.stringify(userToSave));
            setUser(userToSave);

            return userToSave;
        } catch (error) {
            alert(error.message);
        }
    };

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

    const logout = () => {
        setUser('');
        console.log(user);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthUserContext = () => {
    return useContext(AuthContext);
}