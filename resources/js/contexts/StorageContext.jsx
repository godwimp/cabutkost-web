import React, { createContext, useContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';

const StorageContext = createContext();

export function useStorage() {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage must be used within a StorageProvider');
    }
    return context;
}

export function StorageProvider({ children }) {
    const [storageData, setStorageData] = useState(() => {
        const savedData = localStorage.getItem("storageData");
        return savedData
            ? JSON.parse(savedData)
            : {
                penitip_id: null,
                barang_titipan_id: null,
            };
    });

    const updateStorageData = (data) => {
        const newData = { ...storageData, ...data };
        setStorageData(newData);
        localStorage.setItem('storageData', JSON.stringify(newData));
    };

    const clearStorageData = () => {
        setStorageData({
            penitip_id: null,
            barang_titipan_id: null
        });
        localStorage.removeItem('storageData');
    };

    return (
        <StorageContext.Provider value={{
            storageData,
            setStorageData: updateStorageData,
            clearStorageData
        }}>
            {children}
        </StorageContext.Provider>
    );
}

StorageProvider.propTypes = {
    children: PropTypes.node.isRequired
};