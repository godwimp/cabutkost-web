import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import { router } from "@inertiajs/react";
import { AppSidebar } from "@/Components/uiadmin/AppSidebar"; // Ensure this path is correct
import { SidebarProvider } from "@/Components/uiadmin/Sidebar";

const logo = "/images/logo.png";

export default function AdminLayout({ children }) {
    const auth = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (!auth || !auth.isAdmin) {
            router.visit("/login");
        }
    }, [auth]);

    if (!auth) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        router.post("/logout");
    };

    const handleNavigation = (url) => {
        router.visit(url);
    };

    return (
        <SidebarProvider>
        <div className="min-h-screen bg-gray-100 flex">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
                <nav className="bg-white shadow-sm h-16">
                    <div className="h-full px-4 flex items-center justify-between">
                        <div className="text-xl font-bold">
                            <button onClick={() => handleNavigation('/dashboard')}>
                                <img src={logo} alt="Logo" className="h-8" />
                            </button>
                        </div>
                        <div className="relative">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                                <span>{auth.user?.name}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50">
                                    <button onClick={() => handleNavigation("/profile")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                                    <button onClick={() => handleNavigation("/register")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register New Admin</button>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                <main className="py-10 px-8 flex-grow">{children}</main>
            </div>
        </div>
        </SidebarProvider>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
