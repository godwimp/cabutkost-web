import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/uiadmin/Sidebar";
import { AppSidebar } from "@/Components/uiadmin/AppSidebar";
import { router } from "@inertiajs/react";

export default function InvoiceIndex({ invoices }) {
    if (!invoices) {
        return (
            <div>Loading...</div>
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
                            Invoices
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-8 p-2 bg-white rounded-2xl shadow-md">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="md:text-2xl font-semibold">
                                    All Invoices
                                </h2>
                            </div>
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Invoice Number
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Customer
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Date
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Total Amount
                                        </th>
                                        <th className="py-3 px-3 text-xs md:text-lg">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b">
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {invoice.serial_number}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {invoice.buyer_information.name}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {new Date(invoice.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                {invoice.items?.reduce((total, item) => 
                                                    total + (item.unit_price * item.quantity), 0
                                                ).toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                })}
                                            </td>
                                            <td className="py-4 px-0 text-xs md:text-[16px]">
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => router.get(`/admin/invoice/${invoice.id}`)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                    >
                                                        View
                                                    </button>
                                                    <button 
                                                        onClick={() => router.get(`/admin/invoice/${invoice.id}/download`)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Download
                                                    </button>
                                                </div>
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
}
