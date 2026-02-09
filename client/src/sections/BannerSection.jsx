import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AiBrainVisual from '../components/AiBrainVisual';

gsap.registerPlugin(ScrollTrigger);

const BannerSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "center center",
                // pin: true, // DISABLED: Causes NotFoundError with React unmounting
                // pinSpacing: false, // DISABLED: Related to pinning
                end: "+=100%"
            });

            gsap.fromTo(textRef.current.children,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );

            gsap.fromTo(visualRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-gray-950">
            {/* Dotted Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Content */}
                <div ref={textRef} className="space-y-6">
                    <div>
                        <h3 className="text-3xl md:text-5xl font-handwriting text-blue-400 mb-2 transform -rotate-2 inline-block">
                            Digital
                        </h3>
                        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight uppercase tracking-tighter">
                            Marketing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Agency</span>
                        </h2>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-2">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            AI Infrastructure for Marketers
                        </h4>
                        <p className="text-lg text-gray-400 max-w-lg">
                            We empower brands to scale faster using AI, marketing & automation systems tailored for growth.
                        </p>
                    </div>

                    <div className="pt-8">
                        <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300 transform">
                            Book a Free Strategy Call
                        </button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-gray-400 text-sm font-mono border-t border-gray-800 mt-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span>AIGrowthExa.com</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual */}
                <div ref={visualRef} className="relative h-[400px] md:h-[500px] w-full">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                    <AiBrainVisual />
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
