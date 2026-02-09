import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ScrollToTop from '../components/ScrollToTop';

const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const Career = lazy(() => import('../pages/Career'));

const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const AppRoutes = () => {
    return (
        <MainLayout>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Career />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
};

export default AppRoutes;
