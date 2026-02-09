import React, { Suspense, lazy } from 'react';
import HeroSection from '../sections/HeroSection';
import BrandStorySection from '../sections/BrandStorySection';

const BoldStatementSection = lazy(() => import('../sections/BoldStatementSection'));
const GrowthPlanSection = lazy(() => import('../sections/GrowthPlanSection'));
const PrimaryCtaSection = lazy(() => import('../sections/PrimaryCtaSection'));
const OurFeaturesSection = lazy(() => import('../sections/OurFeaturesSection'));
const BannerSection = lazy(() => import('../sections/BannerSection'));
const WhatWeHelpWithSection = lazy(() => import('../sections/WhatWeHelpWithSection'));
const OurClientsSection = lazy(() => import('../sections/OurClientsSection'));
const WhyAiGrowthExaSection = lazy(() => import('../sections/WhyAiGrowthExaSection'));
const StatsSection = lazy(() => import('../sections/StatsSection'));
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'));
const AboutHeroSection = lazy(() => import('../sections/AboutHeroSection'));
const FaqSection = lazy(() => import('../sections/FaqSection'));
const FinalCtaSection = lazy(() => import('../sections/FinalCtaSection'));

const SectionLoader = () => (
    <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const Home = () => {
    return (
        <>
            <HeroSection />
            <BrandStorySection />
            <Suspense fallback={<SectionLoader />}>
                <BoldStatementSection />
                <GrowthPlanSection />
                <PrimaryCtaSection />
                <OurFeaturesSection />
                <BannerSection />
                <WhatWeHelpWithSection />
                <OurClientsSection />
                <WhyAiGrowthExaSection />
                <StatsSection />
                <TestimonialsSection />
                <div id="about-section">
                    <AboutHeroSection />
                </div>
                <FaqSection />
                <FinalCtaSection />
            </Suspense>
        </>
    );
};

export default Home;
