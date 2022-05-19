import React from "react";
import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);

        return (
        <ProductsContext.Provider value={{ products, setProducts, productsToDisplay, setProductsToDisplay }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext);
}