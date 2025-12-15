import React, { createContext, useState, useContext } from 'react';

const BusquedaContext = createContext();

export const useBusqueda = () => useContext(BusquedaContext);

export const BusquedaProvider = ({ children }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState("");

    return (
        <BusquedaContext.Provider value={{ terminoBusqueda, setTerminoBusqueda }}>
            {children}
        </BusquedaContext.Provider>
    );
};