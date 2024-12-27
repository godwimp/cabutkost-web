import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/uiadmin/Sidebar";
import { AppSidebar } from "@/Components/uiadmin/AppSidebar";
import { router } from "@inertiajs/react";

export default function InvoiceShow({ invoice }) {
    if (!invoice) {
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
                            Invoice Details
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-8 p-6 bg-white rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">
                                Invoice #{invoice.serial_number}
                            </h2>
                            <button 
                                onClick={() => router.get(`/admin/invoice/${invoice.id}/download`)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Download Invoice
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="font-semibold mb-2">Customer Information</h3>
                                <p>{invoice.buyer_information.name}</p>
                                <p>{invoice.buyer_information.address.street}</p>
                                <p>{invoice.buyer_information.address.city}, {invoice.buyer_information.address.postal_code}</p>
                                <p>{invoice.buyer_information.phone_number}</p>
                                <p>{invoice.buyer_information.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Invoice Details</h3>
                                <p>Date: {new Date(invoice.created_at).toLocaleDateString()}</p>
                                <p>Currency: {invoice.currency}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4 text-left">Item</th>
                                        <th className="py-3 px-4 text-left">Description</th>
                                        <th className="py-3 px-4 text-right">Quantity</th>
                                        <th className="py-3 px-4 text-right">Unit Price</th>
                                        <th className="py-3 px-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-4 px-4">{item.label}</td>
                                            <td className="py-4 px-4">{item.description}</td>
                                            <td className="py-4 px-4 text-right">{item.quantity}</td>
                                            <td className="py-4 px-4 text-right">
                                                {item.unit_price.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                })}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                {(item.unit_price * item.quantity).toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-semibold">
                                        <td colSpan="4" className="py-4 px-4 text-right">Total Amount:</td>
                                        <td className="py-4 px-4 text-right">
                                            {invoice.items.reduce((total, item) => 
                                                total + (item.unit_price * item.quantity), 0
                                            ).toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            })}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
