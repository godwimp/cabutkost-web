import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShippingContext = createContext();

export function useShipping() {
    const context = useContext(ShippingContext);
    if (!context) {
        throw new Error('useShipping must be used within a ShippingContext');
    }
    return context;
}

export function ShippingProvider({ children }) {
    const [shippingData, setShippingData] = useState(() => {
        const savedData = localStorage.getItem("shippingData");
        return savedData
            ? JSON.parse(savedData)
            : {
                  pengirim_id: null,
                  penerima_id: null,
              };
    });

    const updateShippingData = (data) => {
        const newData = { ...shippingData, ...data };
        setShippingData(newData);
        localStorage.setItem('shippingData', JSON.stringify(newData));
    };

    const clearShippingData = () => {
        setShippingData({
            pengirim_id: null,
            penerima_id: null
        });
        localStorage.removeItem('shippingData');
    };

    return (
        <ShippingContext.Provider value={{
            shippingData,
            setShippingData: updateShippingData,
            clearShippingData
        }}>
            {children}
        </ShippingContext.Provider>
    );
}

ShippingProvider.propTypes = {
    children: PropTypes.node.isRequired
};