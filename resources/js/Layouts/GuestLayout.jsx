import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Guest Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                Home
                            </Link>
                            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Welcome Message */}
            <div className="text-center mt-20">
                <p className="text-gray-700">
                    Halo! ini merupakan page untuk admin. jika kamu bukan seorang admin, bisa kembali ke{' '}
                    <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                        Halaman Utama
                    </Link>
                </p>
            </div>

            {/* Main Content */}
            <main className="flex justify-center">
                {children}
            </main>
        </div>
    );
}

GuestLayout.propTypes = {
    children: PropTypes.node.isRequired
};
