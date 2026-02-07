import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBeams from '../components/AnimatedBeams';
import TextScramble from '../components/TextScramble';

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);
    const introRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2 }
        )
            .fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            )
            .fromTo(buttonsRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            );

    }, []);



    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Glow - Softened for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-40 dark:opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-10 right-[20%] w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full blur-[128px]"></div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeams />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Text Content */}
                <div className="text-center">
                    <div ref={introRef} className="inline-block px-4 py-1.5 mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 rounded-full shadow-sm">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase">
                            <TextScramble
                                text="Introducing AI GrowthExa to Modern Marketers"
                                speed={30}
                                delay={500}
                                onComplete={() => {
                                    gsap.to(introRef.current, {
                                        opacity: 0,
                                        height: 0,
                                        marginBottom: 0,
                                        duration: 1,
                                        delay: 2.5,
                                        ease: "power2.inOut",
                                        onComplete: () => {
                                            if (introRef.current) introRef.current.style.display = 'none';
                                        }
                                    });
                                }}
                            />
                        </span>
                    </div>
                    <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-10 text-gray-900 dark:text-white">
                        <TextScramble text="AI GrowthExa" className="block" speed={40} />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent inline-block whitespace-nowrap mt-4">
                            <TextScramble text="Empower • Scale • Succeed" delay={800} speed={40} />
                        </span>
                    </h1>
                    <p ref={textRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed cursor-ignore">
                        <TextScramble text="AI-Driven Growth, IT & Marketing Agency" delay={1200} /><br />
                        <span className="text-gray-800 dark:text-gray-300 font-medium mt-2 block">
                            <TextScramble text="Where Data Thinks. AI Acts. Brands Grow." delay={2000} speed={30} />
                        </span>
                    </p>
                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
                            Get Your Growth Plan
                        </a>
                        <a href="#services" className="px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white rounded-full font-bold text-lg transition-all shadow-sm">
                            Explore Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
