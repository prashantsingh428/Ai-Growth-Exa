import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from '../components/ParticleBackground';
import PlansModal from '../components/Modals/PlansModal';
import StrategyCallModal from '../components/Modals/StrategyCallModal';

gsap.registerPlugin(ScrollTrigger);

const PrimaryCtaSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const [isPlansOpen, setIsPlansOpen] = React.useState(false);
    const [isStrategyOpen, setIsStrategyOpen] = React.useState(false);

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

            <div ref={contentRef} className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Heading & Buttons */}
                    <div className="text-left space-y-6">
                        <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full border border-blue-500/30">
                            <span className="text-blue-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                                WHERE STRATEGY MEETS EXECUTION
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
                            Ready to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Transform Your Growth?
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                            Stop guessing. Start scaling. We build the infrastructure that powers predictable, high-ROI growth for ambitious brands.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => setIsPlansOpen(true)}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book Strategy Call
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </button>

                            <button
                                onClick={() => setIsPlansOpen(true)}
                                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2"
                            >
                                View Service Plans
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Value Props */}
                    <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        <h3 className="text-2xl font-bold text-white mb-6">Why Partner With Us?</h3>

                        <ul className="space-y-4">
                            {[
                                { title: "Data-Driven Strategy", desc: "No guesswork. Just precision execution based on real metrics." },
                                { title: "Full-Stack AI Integration", desc: "Automate workflows and scale faster with cutting-edge tech." },
                                { title: "Dedicated Growth Team", desc: "Access to experts who treat your business like their own." },
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{item.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div >

            <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
            <StrategyCallModal isOpen={isStrategyOpen} onClose={() => setIsStrategyOpen(false)} />
        </section >
    );
};

export default PrimaryCtaSection;
