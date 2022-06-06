import React from "react";
import { createContext, useContext, useState } from "react";

const ModalContentContext = createContext();

export const ModalContentContextProvider = ({ children }) => {
    const [itemModalContent, setItemModalContent] = useState({});
    const [showModalItemContent, setShowModalItemContent] = useState(false);
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);

    return (
        <ModalContentContext.Provider value={{ itemModalContent, setItemModalContent, showModalItemContent, setShowModalItemContent, showModalConfirmation, setShowModalConfirmation }}>
            {children}
        </ModalContentContext.Provider>
    );
};

export const useModalContentContext = () => {
    return useContext(ModalContentContext);
};