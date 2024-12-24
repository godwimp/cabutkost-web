import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;