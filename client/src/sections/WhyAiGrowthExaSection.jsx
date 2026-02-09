import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon, title, description, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: delay / 1000,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%"
                }
            }
        );
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                    {icon}
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                {description}
            </p>
        </div>
    );
};

const WhyAiGrowthExaSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'AI-First Approach',
            description: 'Decisions powered by data, not assumptions. We leverage machine learning and predictive analytics to optimize every campaign.'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            title: '1600+ Projects Delivered',
            description: 'Across multiple industries and markets. From startups to Fortune 500 companies, we\'ve driven measurable growth.'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: 'Deep Industry Expertise',
            description: 'We understand how different businesses grow. Our team brings decades of combined experience in tech, SaaS, e-commerce, and B2B.'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'ROI-Focused Systems',
            description: 'Every strategy is tied to revenue impact. We build sustainable systems that scale with your business goals.'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: 'End-to-End Automation',
            description: 'From lead capture to conversion, we automate your entire growth funnel so you can focus on what matters most.'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Transparent Reporting',
            description: 'Real-time dashboards and weekly insights. You\'ll always know exactly where your marketing dollars are going and what they\'re returning.'
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] -translate-x-1/2"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[100px] translate-x-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-16 md:mb-20">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Our Advantage
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Growth Exa?</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto mb-8">
                        Because growth needs <span className="text-blue-600 font-bold">systems</span>, not guesswork.
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg text-gray-500 leading-relaxed">
                            Anyone can run ads. Very few can build scalable growth machines that learn, adapt, and profit.
                        </p>
                    </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Bottom Statement */}
                <div className="text-center mt-20">
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <p className="text-xl md:text-2xl font-light mb-2 relative z-10">
                            We don't chase vanity metrics.
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative z-10">
                            We build profit-driven growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyAiGrowthExaSection;
