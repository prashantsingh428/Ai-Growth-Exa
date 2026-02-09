import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from '../components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

const PrimaryCtaSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-16 flex items-center justify-center overflow-hidden bg-[#030712]">
            {/* Dark Background Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]"></div>
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[150px]"></div>
            </div>

            {/* Particle Background - Neuron Effect */}
            <ParticleBackground />

            <div ref={contentRef} className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 text-center">
                {/* Motivation Line */}
                <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full border border-blue-500/30 mb-4">
                    <span className="text-blue-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        WHERE STRATEGY MEETS EXECUTION
                    </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-3 px-2">
                    <span className="text-white">Ready to </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Transform</span>
                    <br />
                    <span className="text-white">Your Growth?</span>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-400 leading-snug max-w-3xl mx-auto mb-8 px-2">
                    Because growth doesn't start with ads.<br />
                    It starts with <span className="text-white font-semibold">clarity, strategy, and the right system.</span>
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-8 px-4">
                    <button className="group relative w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book a Strategy Call
                        </span>
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </button>

                    <button className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-transparent border-2 border-indigo-500 hover:bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Customize Your Growth Plan
                    </button>
                </div>

                {/* Bottom CTA Message Box */}
                <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
                    <p className="text-gray-300 text-base mb-4 leading-snug">
                        Get clarity on your growth roadmap in a <span className="text-blue-400 font-semibold">free 30-minute strategy session</span>
                    </p>

                    <button className="w-full sm:w-auto px-8 sm:px-10 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/30">
                        Get My Personalized Growth Plan
                    </button>

                    {/* Decorative dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default PrimaryCtaSection;
