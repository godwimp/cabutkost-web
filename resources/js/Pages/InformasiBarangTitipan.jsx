import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useStorage } from "@/contexts/StorageContext";

const ArrowRight = "images/panah.png";
const GalleryAdd = "images/gallery-add.png";

const InformasiBarangTitipan = () => {
    const { storageData, setStorageData } = useStorage();
    const [formData, setFormData] = useState({
        deskripsi_barang: "",
        jumlah_barang: "",
        berat_barang: "",
        foto: null,
        penitip_id: "",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlPenitipId = params.get("penitip_id");

        if (!storageData.penitip_id && !urlPenitipId) {
            router.visit("/detailpenitip");
            return;
        }

        if (urlPenitipId && !storageData.penitip_id) {
            setStorageData({ penitip_id: urlPenitipId });
        }

        setFormData((prev) => ({
            ...prev,
            penitip_id: storageData.penitip_id || urlPenitipId,
        }));
    }, [storageData.penitip_id, setStorageData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            foto: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        router.post("/barangtitipan", formDataToSend, {
            onSuccess: () => {
                console.log("Data barang titipan berhasil disimpan");
                router.visit("/ringkasanpenitipan");
            },
            onError: (errors) => {
                console.log("Data barang titipan gagal disimpan:", errors);
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center pt-10 py-6 px-4 md:px-20"
        >
            {/* Container untuk navigasi mobile */}
            <div className="bg-gray-200 p-2 rounded-xl shadow-md w-full mt-14 md:hidden">
                <div className="flex items-center justify-around gap-1">
                    <button
                        onClick={() => router.visit("/detailpenitip")}
                        className="text-xs"
                    >
                        Detail Penitip
                    </button>
                    <div className="bg-white p-2 rounded-lg">
                        <p className="text-xs font-bold">Informasi Barang</p>
                    </div>
                    <p className="text-xs">Ringkasan</p>
                </div>
            </div>

            {/* Tampilan desktop */}
            <div className="hidden md:flex bg-white p-6 mt-20 rounded-3xl shadow-md w-full">
                <div className="flex items-center justify-around w-full">
                    <button
                        onClick={() => router.visit("/detailpenitip")}
                        className="flex items-center gap-2"
                    >
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                            1
                        </div>
                        <p className="text-xl">Detail Penitip</p>
                    </button>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-btncolor text-white rounded-full">
                            2
                        </div>
                        <p className="text-xl font-bold">Informasi Barang</p>
                    </div>
                    <span className="text-gray-500">
                        <img src={ArrowRight} alt="" />
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                            3
                        </div>
                        <p className="text-xl">Ringkasan Pembayaran</p>
                    </div>
                </div>
            </div>

            {/* Detail Barang Titipan */}
            <div className="bg-white p-6 rounded-3xl shadow-md w-full mt-4 md:mt-12">
                <div className="flex items-center justify-start gap-3 mb-4">
                    <div className="flex items-center justify-center h-9 w-9 bg-btncolor text-white rounded-full">
                        2
                    </div>
                    <p className="text-xl font-medium">Detail Barang Titipan</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">
                            Deskripsi Barang
                        </label>
                        <textarea
                            name="deskripsi_barang"
                            value={formData.deskripsi_barang}
                            onChange={handleInputChange}
                            placeholder="Misalnya: koper, kotak, furnitur kecil"
                            className="w-full h-[80px] border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                            style={{ resize: "none" }}
                        ></textarea>
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">
                            Jumlah Barang
                        </label>
                        <input
                            type="text"
                            name="jumlah_barang"
                            value={formData.jumlah_barang}
                            onChange={handleInputChange}
                            placeholder="Masukkan jumlah barang yang akan kamu titipkan"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">
                            Berat Barang (Opsional) (kg)
                        </label>
                        <input
                            type="text"
                            name="berat_barang"
                            value={formData.berat_barang}
                            onChange={handleInputChange}
                            placeholder="Masukkan berat barang yang akan kamu titipkan (dalam kilogram)"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">
                            Foto Barang (opsional, untuk catatan)
                        </label>
                        <div className="w-full h-[160px] border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center"
                            >
                                <img
                                    src={GalleryAdd}
                                    alt=""
                                    className="w-[46px] h-[46px] text-gray-400"
                                />
                                <span className="text-gray-600 mt-1">
                                    Tambahkan Foto
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="submit"
                        className="bg-gray-400 w-full md:w-[400px] text-white py-3 rounded-xl transition font-semibold"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InformasiBarangTitipan;
