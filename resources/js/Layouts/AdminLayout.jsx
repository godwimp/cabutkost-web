import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { router, Link } from '@inertiajs/react';

const logo = '/images/logo.png';

export default function AdminLayout({ children }) {
    const auth = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        if (!auth || !auth.isAdmin) {
            router.visit('/login');
        }
    }, [auth]);

    if (!auth) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        router.post('/logout');
    }
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg min-h-screen">
                <div className="flex flex-col h-full">
                    <div className="space-y-4 py-4">
                        {/* Laporan Section */}
                        <div className="px-4">
                            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Laporan
                            </h2>
                            <div className="mt-3 space-y-2">
                                <Link
                                    href="/admin/laporan-keuangan"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                                >
                                    Laporan Keuangan
                                </Link>
                                <Link
                                    href="/admin/laporan-penitipan"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                                >
                                    Laporan Penitipan
                                </Link>
                                <Link
                                    href="/admin/laporan-pindahan"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                                >
                                    Laporan Pindahan
                                </Link>
                            </div>
                        </div>

                        {/* Management Section */}
                        <div className="px-4">
                            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Management
                            </h2>
                            <div className="mt-3 space-y-2">
                                <Link
                                    href="/admin/manage-penitipan"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                                >
                                    Manage Penitipan
                                </Link>
                                <Link
                                    href="/admin/manage-pindahan"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg"
                                >
                                    Manage Pindahan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar with Logo and Dropdown */}
                <nav className="bg-white shadow-sm h-16">
                    <div className="h-full px-4 flex items-center justify-between">
                        <div className="text-xl font-bold">
                            <Link href="/dashboard">
                                <img src={logo} alt="Logo" className="h-8" />
                            </Link>
                        </div>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                <span>{auth.user?.name}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Register New Admin
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="py-10 px-8 flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired
};
