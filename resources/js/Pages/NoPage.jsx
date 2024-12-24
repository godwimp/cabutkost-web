import React from 'react';

const NoPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-6xl font-bold text-black mb-4">404</h1>
            <p className="text-gray-600 text-center text-2xl">
                Halaman yang Anda cari tidak ditemukan.
            </p>
        </div>
    );
}

export default NoPage;