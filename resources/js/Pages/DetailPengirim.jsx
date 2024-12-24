import React, { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import SelectLokasi from "@/Components/SelectLokasi";
import { useShipping } from "@/contexts/ShippingContext";
const ArrowRight = "images/panah.png";

const DetailPengirim = () => {
    const { setShippingData } = useShipping();
    const [formData, setFormData] = useState({
        nama_pengirim: "",
        nomor_hp_pengirim: "",
        email_pengirim: "",
        tanggal_pengiriman: "",
        kecamatan_pengirim: "",
        alamat_pengirim: "",
        patokan: "",
        nomor_kamar_pengirim: "",
    });
    const [origin, setOrigin] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLokasiChange = (selectedLocation) => {
        setFormData((prevState) => ({
            ...prevState,
            kecamatan_pengirim: selectedLocation ? selectedLocation.label : "",
        }));
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.nama_pengirim.trim()) {
            errors.push("Isi nama pengirim terlebih dahulu!");
        }

        if (!formData.nomor_hp_pengirim.trim()) {
            errors.push("Isi nomor HP pengirim terlebih dahulu!");
        } else if (!/^[0-9]{10,13}$/.test(formData.nomor_hp_pengirim)) {
            errors.push("Nomor HP pengirim tidak valid (minimal 10 digit)");
        }

        if (!formData.email_pengirim.trim()) {
            errors.push("Isi email pengirim terlebih dahulu!");
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_pengirim)
        ) {
            errors.push("Format Email tidak valid");
        }

        if (!formData.tanggal_pengiriman.trim()) {
            errors.push("Isi tanggal pengiriman terlebih dahulu!");
        }

        if (!formData.kecamatan_pengirim.trim()) {
            errors.push("Pilih kecamatan pengirim terlebih dahulu!");
        }

        if (!formData.alamat_pengirim.trim()) {
            errors.push("Isi alamat pengirim terlebih dahulu!");
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            alert("Error: \n" + validationErrors.join("\n"));
            return;
        }

        router.post("/pengirim", formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // Extract pengirim_id from the URL parameters
                const pengirim_id = page.props?.flash?.pengirim_id;
                if (pengirim_id) {
                    setShippingData({ pengirim_id });
                    console.log('Data pengirim berhasil disimpan');
                    router.visit("/detailpenerima");
                }
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                alert(
                    "Error saat menyimpan data: \n" + errorMessages.join("\n")
                );
            },
        });
    };

    return (
        <div className="flex flex-col items-center pt-[100px] py-[60px] px-[100px]">
            <div className="bg-white p-6 rounded-3xl shadow-md w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-btncolor text-white rounded-full ml-10">
                            1
                        </div>
                        <p className="text-xl font-bold">Detail Pengirim</p>
                    </div>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                            2
                        </div>
                        <p className="text-xl">Detail Penerima</p>
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
                    <p className="text-xl font-medium">Informasi Pengirim</p>
                </div>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Nama Pengirim
                        </label>
                        <input
                            type="text"
                            name="nama_pengirim"
                            value={formData.nama_pengirim}
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
                            name="nomor_hp_pengirim"
                            value={formData.nomor_hp_pengirim}
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
                            name="email_pengirim"
                            value={formData.email_pengirim}
                            onChange={handleChange}
                            placeholder="Masukkan Email"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-start mb-4 gap-6 mr-6">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Tanggal Pengiriman
                        </label>
                        <input
                            type="date"
                            name="tanggal_pengiriman"
                            value={formData.tanggal_pengiriman}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Kecamatan
                        </label>
                        <SelectLokasi
                            value={formData.kecamatan_pengirim}
                            onChange={handleLokasiChange}
                            placeholder={"Pilih kecamatan asal beserta kodepos"}
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Alamat Pengirim
                        </label>
                        <input
                            type="text"
                            name="alamat_pengirim"
                            value={formData.alamat_pengirim}
                            onChange={handleChange}
                            placeholder="Alamat Kos Awal"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Patokan (Opsional)
                        </label>
                        <input
                            type="text"
                            name="patokan"
                            value={formData.patokan}
                            onChange={handleChange}
                            placeholder="Masukkan Patokan Kos"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Nomor Kamar dan Lantai (Opsional)
                        </label>
                        <input
                            type="text"
                            name="nomor_kamar_pengirim"
                            value={formData.nomor_kamar_pengirim}
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
};

export default DetailPengirim;
