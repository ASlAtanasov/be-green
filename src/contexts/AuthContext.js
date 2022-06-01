import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const initialState = null;

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialState);
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthUserContext = () => {
    return useContext(AuthContext);
};