import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ScrollToTop from '../components/ScrollToTop';
import ContactModal from '../components/Modals/ContactModal';
import AuthModal from '../components/Modals/AuthModal';

import CookieInfo from '../pages/CookieInfo';
import CopyrightInfo from '../pages/CopyrightInfo';
import PrivacyInfo from '../pages/PrivacyInfo';
import TermsAndConditions from '../pages/TermsAndConditions';

const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const Career = lazy(() => import('../pages/Career'));
const Services = lazy(() => import('../pages/Services'));
const About = lazy(() => import('../pages/About'));
const Awards = lazy(() => import('../pages/Awards'));
const Founder = lazy(() => import('../pages/Founder'));

const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const AppRoutes = () => {
    const location = useLocation();
    const state = location.state;

    // Check if we have a background location (for modal)
    const background = state && state.background;

    return (
        <MainLayout>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
                {/* Always render the main routes. 
                    If we have a background, we use it as the location for the main routes. */}
                <Routes location={background || location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/awards" element={<Awards />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Career />} />
                    <Route path="/cookie-policy" element={<CookieInfo />} />
                    <Route path="/copyright-policy" element={<CopyrightInfo />} />
                    <Route path="/privacy-policy" element={<PrivacyInfo />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Render the Contact Modal as a separate route if requested directly, 
                    OR if it's the current location and we have a background. */}
                <Routes>
                    <Route path="/contact" element={<ContactModal isOpen={true} />} />
                    <Route path="/login" element={<AuthModal isOpen={true} initialView="login" />} />
                    <Route path="/signup" element={<AuthModal isOpen={true} initialView="register" />} />
                    <Route path="/register" element={<AuthModal isOpen={true} initialView="register" />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
};

export default AppRoutes;
