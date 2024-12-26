import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import NavLink from './NavLink';

const LogoImg = "images/logo.png";

const Navbar = () => {
    const { isOpen, setIsOpen } = useState(false);
    const { url } = usePage();
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="fixed top-0 right-0 w-full bg-white text-black shadow-md z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-1">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                            <img
                                src={LogoImg}
                                alt="Logo"
                                className="h-12 md:h-16"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={
                                url === "/"
                                    ? "text-blue-600 font-semibold"
                                    : "hover:text-blue-600"
                            }
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={
                                url === "/about"
                                    ? "text-blue-600 font-semibold"
                                    : "hover:text-blue-600"
                            }
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/penitipan"
                            className={
                                url === "/penitipan"
                                    ? "text-blue-600 font-semibold"
                                    : "hover:text-blue-600"
                            }
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Penitipan
                        </Link>
                        <Link
                            href="/pengiriman"
                            className={
                                url === "/pengiriman"
                                    ? "text-blue-600 font-semibold"
                                    : "hover:text-blue-600"
                            }
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Pengiriman
                        </Link>
                    </div>

                    {/* Right section - untuk balance */}
                    <div className="flex-1"></div>

                    {/* Mobile Menu Overlay */}
                    {isOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={toggleMenu}
                        />
                    )}

                    {/* Mobile Menu */}
                    <div
                        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 
                        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button
                                    onClick={toggleMenu}
                                    className="text-black focus:outline-none"
                                >
                                    ✖
                                </button>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/"
                                    className={
                                        url === "/"
                                            ? "text-blue-600 font-semibold"
                                            : "hover:text-blue-600"
                                    }
                                    onClick={() => {
                                        toggleMenu();
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={
                                        url === "/about"
                                            ? "text-blue-600 font-semibold"
                                            : "hover:text-blue-600"
                                    }
                                    onClick={() => {
                                        toggleMenu();
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/penitipan"
                                    className={
                                        url === "/penitipan"
                                            ? "text-blue-600 font-semibold"
                                            : "hover:text-blue-600"
                                    }
                                    onClick={() => {
                                        toggleMenu();
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Penitipan
                                </Link>
                                <Link
                                    href="/pengiriman"
                                    className={
                                        url === "/pengiriman"
                                            ? "text-blue-600 font-semibold"
                                            : "hover:text-blue-600"
                                    }
                                    onClick={() => {
                                        toggleMenu();
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Pengiriman
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
