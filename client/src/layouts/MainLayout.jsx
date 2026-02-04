import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-950 dark:bg-gray-950 light:bg-gray-50 text-white dark:text-white light:text-gray-900 flex flex-col font-sans transition-colors duration-500">
            <Navbar />

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>

            <SmoothScroll>
                <main className="flex-grow">
                    {children}
                </main>

                <Footer />
            </SmoothScroll>
        </div>
    );
};

export default MainLayout;
