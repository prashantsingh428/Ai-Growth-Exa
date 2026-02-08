import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const AboutHeroSection = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const missionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            tl.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
                .fromTo(contentRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(cardsRef.current,
                    { y: 40, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
                    "-=0.4"
                )
                .fromTo(missionRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.4"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const partners = [
        {
            title: "Startups",
            desc: "Ready to scale from zero to exponential growth.",
            icon: "🚀"
        },
        {
            title: "Growing Brands",
            desc: "Broken through the noise but stuck with inconsistent lead flows.",
            icon: "📈"
        },
        {
            title: "Established Businesses",
            desc: "Tired of wasting budget on legacy marketing that doesn't deliver.",
            icon: "💼"
        }
    ];

    return (
        <section ref={containerRef} className="relative py-16 flex items-center justify-center overflow-hidden bg-white text-gray-900">
            {/* Background enhancement */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <FloatingParticles theme="light" />
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 blur-[120px] rounded-full pointer-events-none -ml-48 -mb-48"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                {/* Small Heading */}
                <div ref={headingRef} className="mb-8">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Who We Are
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                        About The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Company</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content Paragraphs */}
                <div ref={contentRef} className="max-w-3xl mx-auto mb-12">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                        <span className="font-bold text-gray-950">AI Growth Exa</span> is a growth marketing agency built for the new era of business — where <span className="text-blue-600 font-bold uppercase text-sm tracking-widest">AI</span>, <span className="text-indigo-600 font-bold uppercase text-sm tracking-widest">automation</span>, and <span className="font-bold">performance marketing</span> work together seamlessly.
                    </p>
                </div>

                {/* Partners/Who We Help Section */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold mb-8 text-gray-900">We partner with:</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {partners.map((partner, i) => (
                            <div
                                key={i}
                                ref={el => cardsRef.current[i] = el}
                                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-200/20 transition-all group"
                            >
                                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{partner.icon}</div>
                                <h4 className="text-lg font-bold mb-2 text-gray-950">{partner.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{partner.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Statement */}
                <div ref={missionRef} className="relative inline-block px-8 py-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-indigo-600 font-bold px-6 py-2 rounded-full border-2 border-indigo-100 shadow-sm text-sm uppercase tracking-wider">
                        Our Mission
                    </div>
                    <p className="text-2xl md:text-4xl font-black leading-tight">
                        Help brands grow faster, smarter, and sustainably.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutHeroSection;
