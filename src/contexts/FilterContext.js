import React from "react";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    let [filterCheckedValues, setFilterCheckedValues] = useState([]);

    return (
        <FilterContext.Provider value={{ filterCheckedValues, setFilterCheckedValues }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}