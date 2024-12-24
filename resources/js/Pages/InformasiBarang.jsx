import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useShipping } from "@/contexts/ShippingContext";

const ArrowRight = "images/panah.png";

const electronicsItems = [
    "Televisi",
    "Kulkas",
    "Mesin Cuci",
    "Komputer",
    "Kipas Angin",
    "Audio dan Musik",
    "Vacuum Cleaner",
    "Alat Dapur",
];

const furnitureItems = [
    "Meja",
    "Kursi",
    "Sofa",
    "Tempat Tidur",
    "Lemari",
    "Meja Hias",
    "Rak",
    "Kursi Santai",
];

const InformasiBarang = () => {
    const { shippingData, setShippingData } = useShipping();
    const [formData, setFormData] = useState({
        elektronik: [],
        furniture: [],
        etc: "",
        pengirim_id: "",
    });

    const handleCheckboxChange = (category, item) => {
        setFormData((prevState) => {
            const currentItems = prevState[category];
            const updatedItems = currentItems.includes(item)
                ? currentItems.filter((i) => i !== item)
                : [...currentItems, item];

            return {
                ...prevState,
                [category]: updatedItems,
            };
        });
    };

    const validateForm = () => {
        const errors = [];

        // Check if at least one item is selected from either category
        if (
            formData.elektronik.length === 0 &&
            formData.furniture.length === 0
        ) {
            errors.push("Pilih minimal satu barang yang akan dikirim!");
        }

        // If etc field is filled, validate its content
        if (formData.etc && formData.etc.trim().length < 3) {
            errors.push("Deskripsi barang lainnya harus minimal 3 karakter!");
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

        const submissionData = {
            ...formData,
            pengirim_id: shippingData.pengirim_id,
        };

        router.post("/barang", submissionData, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit("/ringkasanpembayaran");
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
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center pt-[100px] py-[60px] px-[100px]"
        >
            <div className="flex flex-row items-center justify-center gap-6">
                <div className="flex-1">
                    <p className="font-semibold text-lg mb-4">Elektronik</p>
                    <div className="grid grid-cols-2 gap-x-40 gap-y-2">
                        {electronicsItems.map((item, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-4"
                            >
                                <input
                                    type="checkbox"
                                    className="transform scale-150 rounded border-black text-teal-600 focus:ring-teal-500"
                                    onChange={() =>
                                        handleCheckboxChange("elektronik", item)
                                    }
                                    checked={formData.elektronik.includes(item)}
                                />
                                <span className="text-gray-700">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="border-l border-gray-300 mx-4 h-40"></div>
                <div className="flex-1">
                    <p className="font-semibold text-lg mb-4">Furniture</p>
                    <div className="grid grid-cols-2 gap-x-40 gap-y-2">
                        {furnitureItems.map((item, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-4"
                            >
                                <input
                                    type="checkbox"
                                    className="transform scale-150 rounded border-black text-teal-600 focus:ring-teal-500"
                                    onChange={() =>
                                        handleCheckboxChange("furniture", item)
                                    }
                                    checked={formData.furniture.includes(item)}
                                />
                                <span className="text-gray-700">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                    Barang Lainnya (Opsional)
                </label>
                <textarea
                    name="etc"
                    value={formData.etc}
                    onChange={(e) =>
                        setFormData({ ...formData, etc: e.target.value })
                    }
                    placeholder="Deskripsikan barang lainnya yang akan dikirim"
                    className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                    rows="4"
                />
            </div>

            <div className="flex justify-end w-full mt-6">
                <button
                    type="submit"
                    className="bg-gray-400 w-[400px] text-white py-3 rounded-xl transition font-semibold hover:bg-opacity-90"
                >
                    Selanjutnya
                </button>
            </div>
        </form>
    );
};

export default InformasiBarang;
