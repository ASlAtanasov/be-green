import React from "react";
import { createContext, useContext, useState } from "react";

const ModalContentContext = createContext();

export const ModalContentContextProvider = ({ children }) => {    
    const [itemModalContent, setItemModalContent] = useState({});
    const [showModal, setShowModal] = useState(false)

    return (
        <ModalContentContext.Provider value={{ itemModalContent, setItemModalContent, showModal, setShowModal }}>
            {children}
        </ModalContentContext.Provider>
    );
};

export const useModalContentContext = () => {
    return useContext(ModalContentContext);
};