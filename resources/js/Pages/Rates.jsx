import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaMapMarkerAlt, FaDotCircle, FaWeightHanging } from 'react-icons/fa';
import { getDistance } from 'geolib';
import LocationPicker from '@/Components/Map/LocationPicker';

const Rates = () => {
    const [weight, setWeight] = useState("");
    const [positions, setPositions] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {
        setError("");
        
        if (!weight) {
            setError("Masukkan berat barang");
            return;
        }
        const numericWeight = parseFloat(weight);
        if (isNaN(numericWeight) || numericWeight <= 0) {
            setError("Berat barang harus lebih dari 0");
            return;
        }

        if (positions.length !== 2) {
            setError("Pilih lokasi penjemputan dan pengantaran");
            return;
        }

        try {
            const distance = getDistance(
                { latitude: positions[0].lat, longitude: positions[0].lng },
                { latitude: positions[1].lat, longitude: positions[1].lng }
            );
            const firstKmPrice = 5000;
            const subsequentKmPrice = 3000;
            const distanceInKm = distance / 1000;
            const numericWeight = parseFloat(weight);

            let totalFee;
            if (distanceInKm <= 1) {
                totalFee = firstKmPrice;
            } else {
                totalFee = (firstKmPrice + (distanceInKm - 1) * subsequentKmPrice);
            }

            if (numericWeight < 25) {
                totalFee *= 0.5;
            }

            totalFee *= numericWeight;
            totalFee = totalFee.toFixed(2);


            setSearchResult({
                serviceType: "Mobil Container",
                weight: `${numericWeight} KG`,
                totalFee: `Rp ${totalFee}`,
                distance: `${(distance / 1000).toFixed(2)} KM`
            });
        } catch (error) { 
            setError("Terjadi kesalahan saat menghitung tarif, silakan coba lagi");
        }
    };

    return (
        <>
            <div className="container mx-auto py-16 px-8 max-w-3xl pt-[120px]">
                <div className="flex justify-center items-center border border-black rounded-xl w-full mb-8">
                    <button
                        onClick={() => router.visit('/track')}
                        className={`w-1/2 text-center py-2 my-3 mx-5 rounded-lg font-medium ${
                            window.location.pathname === '/track'
                                ? "border border-black"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        Trace & Track
                    </button>
                    <button
                        onClick={() => router.visit('/rates')}
                        className={`w-1/2 text-center py-2 my-3 mx-5 rounded-lg font-medium ${
                            window.location.pathname === '/rates'
                                ? "border border-black"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        Shipping Rates
                    </button>
                </div>
                
                <div className="space-y-4">
                    <LocationPicker positions={positions} setPositions={setPositions} />

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <div className="border border-black rounded-xl p-4">
                        <div className="flex items-center mb-2">
                            <FaMapMarkerAlt className="text-black mr-2" />
                            <span className="text-gray-700">
                                {positions[0] ? `Titik Ambil: ${positions[0].lat.toFixed(4)}, ${positions[0].lng.toFixed(4)}` : 'Click map to set pickup location'}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaDotCircle className="text-black mr-2" />
                            <span className="text-gray-700">
                                {positions[1] ? `Titik Antar: ${positions[1].lat.toFixed(4)}, ${positions[1].lng.toFixed(4)}` : 'Click map to set delivery location'}
                            </span>
                        </div>
                    </div>

                    <div className="border border-black rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <FaWeightHanging className="text-black mr-2" />
                            <input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Weight"
                                className="outline-none w-full text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <span className="text-gray-500 font-medium">KG</span>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleSearch}
                            className="bg-gray-400 hover:bg-gray-500 w-[500px] text-white py-3 rounded-xl transition font-semibold"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {searchResult && (
                    <div className="mt-8">
                        <h3 className="font-semibold text-lg text-gray-700 mb-4 text-center">
                            Hasil Pencarian
                        </h3>
                        <div className="text-center mb-4">Jarak: {searchResult.distance}</div>
                        <table className="w-full border-collapse border border-gray-300 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Tipe Layanan</th>
                                    <th className="border border-gray-300 px-4 py-2">Berat</th>
                                    <th className="border border-gray-300 px-4 py-2">Perkiraan Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">{searchResult.serviceType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{searchResult.weight}</td>
                                    <td className="border border-gray-300 px-4 py-2">{searchResult.totalFee}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Rates;