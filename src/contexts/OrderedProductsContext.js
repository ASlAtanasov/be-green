import React from "react";
import { createContext, useContext, useState } from "react";

const OrderedProductsContext = createContext();

export const OrderedProductsContextProvider = ({ children }) => {
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderToDelete, setOrderToDelete] = useState({});

    return (
        <OrderedProductsContext.Provider value={{ 
            orderedProducts, 
            setOrderedProducts, 
            totalPrice, 
            setTotalPrice, 
            orders, 
            setOrders, 
            filteredOrders, 
            setFilteredOrders,
            orderToDelete,
            setOrderToDelete }}>
            {children}
        </OrderedProductsContext.Provider>
    );
};

export const useOrderedProductsContext = () => {
    return useContext(OrderedProductsContext);
};