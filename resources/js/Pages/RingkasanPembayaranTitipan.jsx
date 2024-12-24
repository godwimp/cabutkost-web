import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { useStorage } from '@/contexts/StorageContext';
import axios from 'axios';

const Success = "images/success.png";

const RingkasanPembayaranPenitipan = () => {
    const [countdown, setCountdown] = useState(5);
    const [namaPenitip, setNamaPenitip] = useState('');
    const { storageData, clearStorageData } = useStorage();

    useEffect(() => {
        const fetchNamaPenitip = async () => {
            try {
                const response = await axios.get(`/api/penitip/${storageData.penitip_id}`);
                setNamaPenitip(response.data.nama_penitip);
            } catch (error) {
                console.error('Error fetching nama penitip: ', error);
            }
        };

        if (storageData.penitip_id) {
            fetchNamaPenitip();
        }

        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount === 0) { 
                    clearInterval(timer);
                    router.visit('/');
                    clearStorageData();
                    return 0;
                }
                return prevCount - 1;
            });
        }, 10000);

        return () => clearInterval(timer);
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <img
                src={Success}
                alt="Success"
                className="w-[300px] h-[300px] mb-6"
            />
            <h1 className="text-6xl font-bold text-black mb-4">Sukses</h1>
            <p className="text-gray-600 text-center text-2xl mb-4">
                Terima kasih, {namaPenitip}!
            </p>
            <p className="text-gray-600 text-center text-2xl mb-4">
                Pemesanan Anda telah berhasil, dan kami akan mengirimkan email
                konfirmasi segera.
            </p>
            <p className="text-gray-400 text-xl">
                Redirect ke halaman utama dalam {countdown} detik...
            </p>
        </div>
    );
};

export default RingkasanPembayaranPenitipan;
