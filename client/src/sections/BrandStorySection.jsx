import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const BrandStorySection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(paragraphRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: paragraphRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(highlightRef.current,
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.5,
                    ease: "back.out(1.4)",
                    scrollTrigger: {
                        trigger: highlightRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 flex items-center justify-center overflow-hidden bg-white">
            {/* Neuron Particle Effect Background */}
            <FloatingParticles theme="light" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10 py-12">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase mb-2 block">
                            Our Story
                        </span>
                        <div className="h-0.5 w-16 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
                    </div>
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-400"
                    >
                        Brand Story
                    </h2>
                </div>

                {/* Paragraph Content */}
                <div
                    ref={paragraphRef}
                    className="mb-16 relative"
                >
                    <div className="absolute -left-4 top-0 w-1 h-full bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block"></div>
                    <p className="text-xl md:text-2xl text-black font-bold text-center leading-relaxed max-w-4xl mx-auto">
                        At <span className="font-extrabold text-blue-700">AI GrowthExa</span>, we help businesses build brands that feel real, purposeful, and unforgettable.
                        From brand identity and visual design to voice, messaging, and performance marketing, we shape
                        every detail to reflect who you are today and where you're going tomorrow.
                    </p>
                </div>

                {/* Highlight Box */}
                <div
                    ref={highlightRef}
                    className="relative"
                >
                    <div className="relative p-10 md:p-12 bg-blue-50 dark:bg-gray-900 border-2 border-blue-600 dark:border-blue-500 rounded-2xl shadow-xl">
                        {/* Corner decorations */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-blue-600 dark:border-blue-400"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-blue-600 dark:border-blue-400"></div>

                        <div className="space-y-6">
                            {/* Main statement */}
                            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
                                We don't just design logos.
                            </h3>

                            {/* Divider */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px w-16 bg-blue-600 dark:bg-blue-400"></div>
                                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                <div className="h-px w-16 bg-blue-600 dark:bg-blue-400"></div>
                            </div>

                            {/* Supporting text */}
                            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                                We create meaning, consistency, and trust across every digital touchpoint.
                            </p>

                            {/* Call to action */}
                            <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-center">
                                    If you're ready to stand out, connect deeply with your audience, and grow with confidence —
                                    <span className="block mt-2 text-blue-600 dark:text-blue-400 font-bold">
                                        AI GrowthExa is where your brand begins its next chapter.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStorySection;
