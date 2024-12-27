import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { SidebarProvider, SidebarTrigger } from "@/Components/uiadmin/Sidebar";
import { AppSidebar } from "@/Components/uiadmin/AppSidebar";

export default function CreateNewInvoice({ pengirim }) {
    const [items, setItems] = useState(
        pengirim.barang.map((item) => ({
            ...item,
            unit_price: item.unit_price || "",
            quantity: item.quantity || 1,
        }))
    );

    const [ongkir, setOngkir] = useState("");

    function handlePriceChange(index, value) {
        const newItems = [...items];
        newItems[index].unit_price = value;
        setItems(newItems);
    }

    function handleQuantityChange(index, value) {
        const newItems = [...items];
        newItems[index].quantity = value;
        setItems(newItems);
    }

    function handleOngkirChange(value) {
        setOngkir(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const hasEmptyPrice = items.some((item) => !item.unit_price);
        const hasInvalidQuantity = items.some((item) => item.quantity < 1);
        const hasInvalidOngkir = !ongkir || parseFloat(ongkir) < 0;

        if (hasEmptyPrice || hasInvalidQuantity || hasInvalidOngkir) {
            alert(
                "Please fill in all prices, ensure quantities are at least 1, and shipping cost is valid"
            );
            return;
        }

        router.post(
            "/admin/invoice",
            {
                pengirim_id: pengirim.id,
                items: items.map((item) => ({
                    ...item,
                    unit_price: parseFloat(item.unit_price),
                    quantity: parseInt(item.quantity),
                })),
                ongkir: parseFloat(ongkir),
            },
            {
                onError: (errors) => {
                    alert(
                        "Error creating invoice: " +
                            Object.values(errors).join("\n")
                    );
                },
            }
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="bg-gray-100 min-h-screen min-w-max md:w-full">
                <div className="mx-4 md:mx-20">
                    <div className="flex items-center justify-start">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-xl md:text-4xl font-semibold mt-6 mb-6">
                            Create New Invoice
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-8 p-2 bg-white rounded-2xl shadow-md">
                        <div className="p-4">
                            <div className="md:flex md:flex-row md:justify-between md:border-b-2 md:border-black md:mb-6"></div>
                            <h2 className="md:text-2xl font-semibold mb-4">
                                Create Invoice for {pengirim.nama_pengirim}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="md:flex md:items-center mb-4 gap-4"
                                    >
                                        <div className="mb-2 md:mb-0 md:w-1/4">
                                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1">
                                                Item Name
                                            </label>
                                            <input
                                                type="text"
                                                value={item.nama_barang}
                                                disabled
                                                className="w-full border border-gray-300 p-2 rounded bg-gray-50 text-sm md:text-[16px]"
                                            />
                                        </div>
                                        <div className="mb-2 md:mb-0 md:w-1/4">
                                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1">
                                                Unit Price
                                            </label>
                                            <input
                                                type="number"
                                                value={item.unit_price}
                                                onChange={(e) =>
                                                    handlePriceChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded text-sm md:text-[16px]"
                                                placeholder="Enter price"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2 md:mb-0 md:w-1/4">
                                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded text-sm md:text-[16px]"
                                                placeholder="Enter quantity"
                                                min="1"
                                                required
                                            />
                                        </div>
                                        <div className="md:w-1/4">
                                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1">
                                                Shipping Cost
                                            </label>
                                            <input
                                                type="number"
                                                value={ongkir}
                                                onChange={(e) =>
                                                    handleOngkirChange(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded text-sm md:text-[16px]"
                                                placeholder="Enter shipping cost"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm md:text-lg"
                            >
                                Create Invoice
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
