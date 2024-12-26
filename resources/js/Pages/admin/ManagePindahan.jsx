import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SidebarProvider, SidebarTrigger } from "@/Components/uiadmin/Sidebar";
import { AppSidebar } from "@/Components/uiadmin/AppSidebar";
import { router } from "@inertiajs/react";

const ManagePindahan = ({ pindahan }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const updateStatus = (e, id) => {
        router.post("/admin/pindahan/update-status", {
            id: id,
            status: e.target.value,
        });
    };

    const filteredPindahan = pindahan.filter((p) =>
        p.pengirim.nama_pengirim
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="bg-gray-100 min-h-screen min-w-max md:w-full">
                <div className="mx-4 md:mx-20">
                    <div className="flex items-center justify-start">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-xl md:text-4xl font-semibold mt-6 mb-6">
                            Management - Pesanan Pindahan
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-8 p-2 bg-white rounded-2xl shadow-md">
                        <div className="p-4">
                            <div className="md:flex md:flex-row md:justify-between md:border-b-2 md:border-black md:mb-6">
                                <h2 className="md:text-2xl font-semibold mb-4">
                                    Data Pindahan Pelanggan
                                </h2>
                                <div className="mb-4 md:mb-0">
                                    <div className="flex items-center border border-gray-400 px-3 py-2 md:py-1 rounded-full mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="px-3 w-full focus:outline-none text-sm md:text-sm"
                                        />
                                        <span className="mr-2 md:py-1 text-gray-500 font-medium">
                                            <FaSearch className="text-black text-sm md:text-[16px]" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            ID Pesanan
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Nama Pelanggan
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Kategori
                                        </th>
                                        <th className="hidden md:block py-3 px-3 text-xs md:text-lg">
                                            Alamat Awal
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Alamat Akhir
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Status
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPindahan.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {item.id}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {item.pengirim.nama_pengirim}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {item.kategori}
                                            </td>
                                            <td className="hidden md:block py-4 px-0 text-xs md:text-[16px]">
                                                {item.pengirim.alamat_pengirim}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {item.penerima.alamat_penerima}
                                            </td>
                                            <td className="py-4 pr-2 text-xs md:text-[16px]">
                                                <select
                                                    className={`border rounded px-2 py-1 ${item.status_color}`}
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        updateStatus(e, item.id)
                                                    }
                                                >
                                                    <option value="Diproses">
                                                        Diproses
                                                    </option>
                                                    <option value="Sedang Diambil">
                                                        Sedang Diambil
                                                    </option>
                                                    <option value="Sedang Dikirim">
                                                        Sedang Dikirim
                                                    </option>
                                                    <option value="Sampai">
                                                        Sampai
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="text-xs md:text-lg">
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            `/admin/pindahan/${item.id}`
                                                        )
                                                    }
                                                    className="bg-blue-600 text-white px-4 py-1 rounded"
                                                >
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default ManagePindahan;
