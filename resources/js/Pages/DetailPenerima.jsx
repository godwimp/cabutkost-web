import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SelectLokasi from '@/Components/SelectLokasi';
import { useShipping } from '@/contexts/ShippingContext';

const ArrowRight = "images/panah.png";
const DetailPenerima = () => {
    const { shippingData, setShippingData } = useShipping();
    const [formData, setFormData] = useState({
        nama_penerima: '',
        nomor_hp_penerima: '',
        email_penerima: '',
        kecamatan_penerima: '',
        alamat_penerima: '',
        nomor_kamar_penerima: '',
        pengirim_id: ''
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlPengirimId = params.get('pengirim_id');

        if(!shippingData.pengirim_id && !urlPengirimId) {
            router.visit('/detailpengirim');
            return;
        }

        if (urlPengirimId && !shippingData.pengirim_id) {
            setShippingData({ pengirim_id: urlPengirimId });
        }

        setFormData(prev => ({
            ...prev,
            pengirim_id: shippingData.pengirim_id || urlPengirimId
        }));
    }, [shippingData.pengirim_id, setShippingData]);

    const validateForm = () => {
        const errors = [];
        if (!formData.nama_penerima.trim()) {
            errors.push("Isi nama penerima terlebih dahulu!");
        }

        if (!formData.nomor_hp_penerima.trim()) {
            errors.push("Isi nomor HP penerima terlebih dahulu!");
        } else if (!/^[0-9]{10,13}$/.test(formData.nomor_hp_penerima)) {
            errors.push("Nomor HP penerima tidak valid (minimal 10 digit)");
        }

        if (!formData.email_penerima.trim()) {
            errors.push("Isi email penerima terlebih dahulu!");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_penerima)) {
            errors.push("Format Email tidak valid");
        }

        if (!formData.kecamatan_penerima.trim()) {
            errors.push("Pilih kecamatan penerima terlebih dahulu!");
        }

        if (!formData.alamat_penerima.trim()) {
            errors.push("Isi alamat penerima terlebih dahulu!");
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLokasiChange = (selectedLocation) => {
        setFormData(prevState => ({
            ...prevState,
            kecamatan_penerima: selectedLocation ? selectedLocation.label : ''
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            alert("Error: \n" + validationErrors.join("\n"));
            return;
        }

        router.post('/penerima', formData, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Data penerima berhasil disimpan');
                router.visit('/informasibarang');
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                alert("Error saat menyimpan data: \n" + errorMessages.join("\n"));
            }
        });
    }

    return (
        <div className="flex flex-col items-center pt-[100px] py-[60px] px-[100px]">
            <div className="bg-white p-6 rounded-3xl shadow-md w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full ml-10">
                            1
                        </div>
                        <p className="text-xl">Detail Pengirim</p>
                    </div>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-btncolor text-white rounded-full">
                            2
                        </div>
                        <p className="text-xl font-bold">Detail Penerima</p>
                    </div>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                            3
                        </div>
                        <p className="text-xl">Informasi Barang</p>
                    </div>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                            4
                        </div>
                        <p className="text-xl mr-10">Ringkasan Pembayaran</p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-3xl shadow-md w-full mt-12"
            >
                <div className="flex flex-row items-center justify-start gap-3 mb-4">
                    <div className="flex items-center justify-center h-9 w-9 bg-btncolor text-white rounded-full">
                        1
                    </div>
                    <p className="text-xl font-medium">Informasi Penerima</p>
                </div>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Nama Penerima
                        </label>
                        <input
                            type="text"
                            name="nama_penerima"
                            value={formData.nama_penerima}
                            onChange={handleChange}
                            placeholder="Masukkan Nama"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Nomor Handphone
                        </label>
                        <input
                            type="tel"
                            name="nomor_hp_penerima"
                            value={formData.nomor_hp_penerima}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email_penerima"
                            value={formData.email_penerima}
                            onChange={handleChange}
                            placeholder="Masukkan Email"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Kecamatan/Kota
                        </label>
                        <SelectLokasi
                            value={formData.kecamatan_penerima}
                            onChange={handleLokasiChange}
                            placeholder={"Pilih kecamatan tujuan"}
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Alamat Penerima
                        </label>
                        <input
                            type="text"
                            name="alamat_penerima"
                            value={formData.alamat_penerima}
                            onChange={handleChange}
                            placeholder="Alamat Kos Tujuan"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Nomor Kamar dan Lantai (Opsional)
                        </label>
                        <input
                            type="text"
                            name="nomor_kamar_penerima"
                            value={formData.nomor_kamar_penerima}
                            onChange={handleChange}
                            placeholder="Masukkan lantai dan kamar"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end py-4">
                    <button
                        type="submit"
                        className="bg-gray-400 w-[400px] text-white py-3 rounded-xl transition font-semibold hover:bg-opacity-90"
                    >
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DetailPenerima;