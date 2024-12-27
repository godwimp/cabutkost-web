import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Halo, {auth.user.name}!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
