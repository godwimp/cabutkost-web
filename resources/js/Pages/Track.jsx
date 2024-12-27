import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';

const Track = () => {
    const [pengirimId, setPengirimId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');

    const getStatusColor = (status) => {
        const colors = {
            'Diproses': 'bg-yellow-100 text-yellow-800',
            'Sedang Diambil': 'bg-blue-100 text-blue-800',
            'Sedang Dikirim': 'bg-purple-100 text-purple-800',
            'Sampai': 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleSearch = async () => {
        try {
            setError('');
            if (!pengirimId.trim()) {
                setError('ID Pengirim harus diisi');
                return;
            }

            const response = await axios.post('/track/search', {
                pengirim_id: pengirimId
            });
            
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || 'Terjadi kesalahan saat mencari data');
            setSearchResult(null);
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-16 px-8 max-w-3xl pt-[120px]">
                {/* Navigation Buttons */}
                <div className="flex justify-center items-center border border-black rounded-xl w-full mb-8">
                    <button
                        onClick={() => router.visit("/track")}
                        className="w-1/2 text-center py-2 my-3 mx-5 rounded-lg font-medium border border-black"
                    >
                        Trace & Track
                    </button>
                    <button
                        onClick={() => router.visit("/rates")}
                        className="w-1/2 text-center py-2 my-3 mx-5 rounded-lg font-medium hover:bg-gray-100"
                    >
                        Shipping Rates
                    </button>
                </div>

                {/* Input Container */}
                <div className="border border-black rounded-xl p-4">
                    <div className="flex w-full">
                        <input
                            type="text"
                            value={pengirimId}
                            onChange={(e) => setPengirimId(e.target.value)}
                            placeholder="Masukkan ID Pengirim"
                            className="w-full outline-none text-gray-700 placeholder-gray-400 min-w-0"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Search Button */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleSearch}
                        className="w-[500px] text-white py-3 rounded-xl transition font-semibold bg-gray-400 hover:bg-[#236665]"
                    >
                        Search
                    </button>
                </div>

                {/* Search Results */}
                {searchResult && (
                    <div className="mt-8">
                        <h3 className="font-semibold text-lg text-gray-700 mb-4 text-center">
                            Hasil Pencarian
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-center">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Nama Pengirim</th>
                                        <th className="border border-gray-300 px-4 py-2">Barang</th>
                                        <th className="border border-gray-300 px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {searchResult.pengirim.nama_pengirim}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {searchResult.barang.map((item, index) => (
                                                <div key={index}>{item.nama_barang}</div>
                                            ))}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {searchResult.barang.map((item, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)} mt-1`}
                                                >
                                                    {item.status}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Track;