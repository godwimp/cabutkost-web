import React from 'react';
import { FaCalculator } from 'react-icons/fa';
import { router } from '@inertiajs/react';

export const ShippingCalculator = ({ isMobile = false }) => {
    const handleSearch = () => {
        router.get('/rates');
    };

    return (
        <div className={isMobile ? "block mt-8" : ""}>
            <div className="text-2xl font-bold mb-4">
                Hitung perkiraan harga untuk pengiriman Anda disini:
            </div>
            <button
                onClick={handleSearch}
                className="flex items-center justify-center w-full bg-gray-400 text-white p-3 rounded-xl"
            >
                <FaCalculator className="mr-2" />
                <span className={isMobile ? "text-sm" : ""}>Hitung</span>
            </button>
        </div>

    );
};
