import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Career from '../pages/Career';
import ScrollToTop from '../components/ScrollToTop';

const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

const AppRoutes = () => {
    return (
        <MainLayout>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Career />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRoutes;
