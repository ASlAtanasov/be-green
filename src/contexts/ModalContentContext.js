import React from "react";
import { createContext, useContext, useState } from "react";

const ModalContentContext = createContext();

export const ModalContentContextProvider = ({ children }) => {    
    const [itemModalContent, setItemModalContent] = useState({});

    return (
        <ModalContentContext.Provider value={{ itemModalContent, setItemModalContent }}>
            {children}
        </ModalContentContext.Provider>
    )
}

export const useModalContentContext = () => {
    return useContext(ModalContentContext);
}