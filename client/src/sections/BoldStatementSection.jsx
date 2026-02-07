import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aiInfinityComplete from '../assets/ai-infinity-complete.png';
import ParticleBackground from '../components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

const BoldStatementSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(imageRef.current,
                { x: 100, opacity: 0, scale: 0.9 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
            {/* Background Glow - Rich and Vibrant like Hero */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/70 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-10 right-[20%] w-[500px] h-[500px] bg-purple-600/70 rounded-full blur-[150px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/50 rounded-full blur-[150px]"></div>
            </div>

            {/* Particle Background - Matching HeroSection */}
            <ParticleBackground />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content - Left Side */}
                    <div ref={textRef} className="space-y-8">
                        <div>
                            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
                                AI-Powered Marketing Infrastructure
                            </p>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                                <span className="text-white">Scale Smarter.</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Grow Faster.</span>
                                <br />
                                <span className="text-white">With AI.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                                We help brands automate, optimize, and scale marketing using AI systems.
                            </p>
                        </div>

                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
                            Book a Free Strategy Call
                        </button>
                    </div>

                    {/* Complete Visual - Right Side */}
                    <div ref={imageRef} className="relative">
                        <div className="relative">
                            <img
                                src={aiInfinityComplete}
                                alt="AI Continuous Growth with Analytics Dashboard"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />

                            {/* Glow effect behind image - Intense and Vibrant */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/50 to-purple-600/50 dark:from-blue-500/70 dark:to-purple-500/70 blur-3xl -z-10"></div>
                        </div>

                        {/* Growth Stats Below - Dark Theme */}
                        <div className="mt-8 grid grid-cols-3 gap-6 text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
                            <div>
                                <p className="text-4xl font-bold text-blue-400">300%</p>
                                <p className="text-sm text-gray-400 mt-2">ROI Increase</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50%</p>
                                <p className="text-sm text-gray-400 mt-2">Cost Reduction</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-blue-400">24/7</p>
                                <p className="text-sm text-gray-400 mt-2">Automation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoldStatementSection;
