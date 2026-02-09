import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI-Powered Performance Marketing",
        description: "Smarter targeting. Better ROAS. Lower CPL.",
        icon: "⚡"
    },
    {
        title: "Lead Generation Systems",
        description: "Predictable, high-quality leads — not random traffic.",
        icon: "🎯"
    },
    {
        title: "Marketing Automation & Funnels",
        description: "AI-driven follow-ups that convert while you sleep.",
        icon: "🤖"
    },
    {
        title: "Conversion Rate Optimization (CRO)",
        description: "Turn visitors into customers — scientifically.",
        icon: "📊"
    },
    {
        title: "AI CRM & Sales Automation",
        description: "Close more deals with less manual effort.",
        icon: "💻"
    },
    {
        title: "Brand Growth & Scaling Strategy",
        description: "From startup traction to scale-up dominance.",
        icon: "🚀"
    }
];

const ServiceCard = ({ title, description, icon }) => {
    const cardRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineRef.current = gsap.timeline({ paused: true })
                .to(cardRef.current.querySelector('.card-inner'), {
                    rotateY: 180,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
        }, cardRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => timelineRef.current?.play();
    const handleMouseLeave = () => timelineRef.current?.reverse();

    return (
        <div
            ref={cardRef}
            className="service-card w-full h-[240px] perspective-1000 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-inner relative w-full h-full transition-all duration-500 transform-style-3d">
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-gray-100 rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center text-center z-20">
                    <div className="text-4xl mb-3 p-3 bg-blue-50 rounded-xl text-blue-900 shadow-sm">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {title}
                    </h3>
                    <div className="absolute bottom-6 text-sm text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Hover to reveal
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-blue-600 rounded-2xl shadow-xl p-5 flex flex-col items-center justify-center text-center text-white border border-blue-500">
                    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                    <p className="text-sm leading-snug mb-3 text-blue-50">
                        {description}
                    </p>
                    <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg">
                        Learn More →
                    </button>

                    {/* Decorative blurred glow behind content */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

const WhatWeHelpWithSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(".service-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                    }
                }
            );

            gsap.fromTo(buttonRef.current,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        end: "bottom 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-20 py-16 bg-white overflow-hidden">
            {/* Animated Background Mesh & Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingParticles theme="light" />
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        What We Help You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Grow With</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-snug">
                        We combine <span className="text-blue-600 font-semibold">AI intelligence</span> + <span className="text-blue-600 font-semibold">marketing execution</span> + <span className="text-blue-600 font-semibold">automation</span> to build scalable growth engines.
                    </p>
                </div>

                {/* Services Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        ref={buttonRef}
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-blue-600/30 hover:border-blue-600 text-blue-600 font-bold text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1"
                    >
                        <span>🔘 View All Services</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhatWeHelpWithSection;
