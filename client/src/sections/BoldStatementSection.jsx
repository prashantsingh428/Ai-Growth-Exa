import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aiInfinityComplete from '../assets/ai-infinity-complete.png';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const BoldStatementSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text animation
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

            // Image animation
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
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-gray-950 to-green-950/20"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[128px]"></div>

            {/* Neuron Particle Effect */}
            <FloatingParticles />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content - Left Side */}
                    <div ref={textRef} className="space-y-8">
                        <div>
                            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4">
                                AI-Powered Marketing Infrastructure
                            </p>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
                                <span className="text-white">Scale Smarter.</span>
                                <br />
                                <span className="text-green-400">Grow Faster.</span>
                                <br />
                                <span className="text-white">With AI.</span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                                We help brands automate, optimize, and scale marketing using AI systems.
                            </p>
                        </div>

                        <button className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-400 text-gray-900 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50">
                            Book a Free Strategy Call
                        </button>
                    </div>

                    {/* Complete Visual - Right Side */}
                    <div ref={imageRef} className="relative">
                        <div className="relative">
                            <img
                                src={aiInfinityComplete}
                                alt="AI Continuous Growth with Analytics Dashboard"
                                className="w-full h-auto"
                            />

                            {/* Glow effect behind image */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/40 to-green-600/40 blur-3xl -z-10"></div>
                        </div>

                        {/* Growth Stats Below */}
                        <div className="mt-8 grid grid-cols-3 gap-6 text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                            <div>
                                <p className="text-4xl font-bold text-blue-400">300%</p>
                                <p className="text-sm text-gray-400 mt-2">ROI Increase</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-green-400">50%</p>
                                <p className="text-sm text-gray-400 mt-2">Cost Reduction</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-400">24/7</p>
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
