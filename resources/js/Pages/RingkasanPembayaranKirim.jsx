import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { useShipping } from '@/contexts/ShippingContext';
import axios from 'axios';

const Success = "images/success.png";

const RingkasanPembayaranKirim = () => {
    const [countdown, setCountdown] = useState(5);
    const [namaPengirim, setNamaPengirim] = useState('');
    const { shippingData, clearShippingData } = useShipping();

    useEffect(() => {
        const fetchNamaPengirim = async () => {
            try {
                const response = await axios.get(`/api/pengirim/${shippingData.pengirim_id}`);
                setNamaPengirim(response.data.nama_pengirim);
            } catch (error) {
                console.error('Error fetching nama pengirim: ', error);
            }
        };

        if (shippingData.pengirim_id) {
            fetchNamaPengirim();
        }

        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount === 0) { 
                    clearInterval(timer);
                    router.visit('/');
                    clearShippingData();
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
                Terima kasih, {namaPengirim}!
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

export default RingkasanPembayaranKirim;