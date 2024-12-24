import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/contexts/AuthContext';
import { router, Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        router.push('/login');
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8">
                            {/* Laporan Section */}
                            <Link
                                href="/admin/laporan-keuangan"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                                Laporan Keuangan
                            </Link>
                            <Link
                                href="/admin/laporan-penitipan"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                                Laporan Penitipan
                            </Link>
                            <Link
                                href="/admin/laporan-pindahan"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                                Laporan Pindahan
                            </Link>

                            {/* Management Section */}
                            <Link
                                href="/admin/manage-penitipan"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                                Manage Penitipan
                            </Link>
                            <Link
                                href="/admin/manage-pindahan"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                                Manage Pindahan
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired
};
