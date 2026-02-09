import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    { icon: '🤖', title: 'AI Marketing Solutions', subtitle: 'LLM Growth' },
    { icon: '📊', title: 'Performance Marketing', subtitle: 'Google • Meta • LinkedIn • YouTube' },
    { icon: '🚀', title: 'SEO & Growth Strategy', subtitle: 'Organic Growth' },
    { icon: '🎙️', title: 'Podcast Marketing', subtitle: 'Audio Branding' },
    { icon: '📱', title: 'Social Media Marketing', subtitle: 'Multi-Platform' },
    { icon: '📍', title: 'GMB with AI Model', subtitle: 'Local SEO' },
    { icon: '⚡', title: 'Funnel & Automation', subtitle: 'Lead Generation' },
    { icon: '🎨', title: 'Branding & Creative', subtitle: 'Visual Identity' },
    { icon: '✏️', title: 'Logo Design', subtitle: 'Brand Assets' },
    { icon: '🌐', title: 'Website Development', subtitle: 'Full Stack' },
    { icon: '📲', title: 'Mobile Applications', subtitle: 'Android / iOS' },
    { icon: '✍️', title: 'Content Creation', subtitle: 'Writing & Strategy' },
    { icon: '🤝', title: 'Sales Alignment', subtitle: 'Revenue Growth' },
    { icon: '📧', title: 'Email Marketing', subtitle: 'Automation' },
    { icon: '🛒', title: 'E-commerce Marketing', subtitle: 'Conversion Focus' },
    { icon: '💬', title: 'WhatsApp Messaging', subtitle: 'Direct Outreach' },
    { icon: '🤝', title: 'Brand Collaborations', subtitle: 'Strategic Partners' },
    { icon: '⭐', title: 'Influencer Marketing', subtitle: 'Social Proof' },
    { icon: '🎯', title: 'UX/UI Design', subtitle: 'User Experience' },
    { icon: '📈', title: 'Application Marketing', subtitle: 'App Growth' },
    { icon: '🗺️', title: 'Go-To-Market', subtitle: 'Launch Success' }
];

const row1 = features.slice(0, 11);
const row2 = features.slice(11);

const FeatureCard = ({ icon, title, subtitle }) => {
    return (
        <div className="flex-shrink-0 w-64 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            {/* 3D Icon Container */}
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 flex items-center justify-center text-3xl shadow-md">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">
                {title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-500">
                {subtitle}
            </p>
        </div>
    );
};

const OurFeaturesSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden mb-32">
            {/* Header Section - Light Theme */}
            <div className="bg-white py-10 md:py-12">
                <div ref={headerRef} className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
                    {/* Tag */}
                    <div className="inline-block px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-4">
                        <span className="text-blue-600 text-xs md:text-sm font-semibold tracking-widest uppercase">
                            OUR FEATURES
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
                        <span className="text-gray-900">Together, we achieve </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">great things</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        At AI GrowthExa, we blend innovation and expertise to deliver tailored digital solutions.
                        Our features empower businesses to reach their full potential and achieve success collaboratively.
                    </p>
                </div>
            </div>

            {/* Horizontal Scroll Gallery */}
            <div ref={containerRef} className="bg-gradient-to-b from-white via-gray-50 to-white flex flex-col justify-center py-4 overflow-hidden">
                {/* Row 1 - Slides Right to Left */}
                <div className="relative mb-4">
                    <div
                        ref={row1Ref}
                        className="flex gap-6 px-6 animate-marquee-left hover:pause-animation"
                        style={{
                            animation: 'marquee-left 30s linear infinite'
                        }}
                    >
                        {[...row1, ...row1].map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                subtitle={feature.subtitle}
                            />
                        ))}
                    </div>
                </div>

                {/* Row 2 - Slides Left to Right */}
                <div className="relative">
                    <div
                        ref={row2Ref}
                        className="flex gap-6 px-6 animate-marquee-right hover:pause-animation"
                        style={{
                            animation: 'marquee-right 30s linear infinite'
                        }}
                    >
                        {[...row2, ...row2].map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                subtitle={feature.subtitle}
                            />
                        ))}
                    </div>
                </div>

                {/* CSS Keyframes */}
                <style jsx>{`
                    @keyframes marquee-left {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    
                    @keyframes marquee-right {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    
                    .hover\\:pause-animation:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default OurFeaturesSection;
