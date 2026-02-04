import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

// Placeholder pages for now
const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

const AppRoutes = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRoutes;
