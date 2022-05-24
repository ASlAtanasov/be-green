import React from "react";
import { createContext, useContext, useState } from "react";

const OrderedProductsContext = createContext();

export const OrderedProductsContextProvider = ({ children }) => {
    const [orderedProducts, setOrderedProducts] = useState([]);

    return (
        <OrderedProductsContext.Provider value={{ orderedProducts, setOrderedProducts }}>
            {children}
        </OrderedProductsContext.Provider>
    )
}

export const useOrderedProductsContext = () => {
    return useContext(OrderedProductsContext);
}